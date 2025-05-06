"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PlayerStats = {
	id: string;
	season_id: string;
	player_id: string;
	team_id: string;
	games_played: number;
	goals: number;
	assists: number;
	points: number;
};

type Season = {
	id: string;
	name: string;
};

type Team = {
	id: string;
	name: string;
};

type Player = {
	id: string;
	name: string;
	team_id: string;
	stats?: PlayerStats;
};

export default function PlayerStatsManagement() {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [players, setPlayers] = useState<Player[]>([]);
	const [selectedSeason, setSelectedSeason] = useState("");
	const [editingStats, setEditingStats] = useState<PlayerStats | null>(null);
	const [error, setError] = useState<string | null>(null);

	const supabase = createClient();

	useEffect(() => {
		fetchSeasons();
	}, []);

	useEffect(() => {
		if (selectedSeason) {
			fetchTeamsAndPlayers();
		}
	}, [selectedSeason]);

	async function fetchSeasons() {
		const { data: seasons, error } = await supabase
			.from("seasons")
			.select("id, name")
			.order("start_date", { ascending: false });

		if (error) {
			setError("Failed to fetch seasons");
			return;
		}

		setSeasons(seasons);
	}

	async function fetchTeamsAndPlayers() {
		// Fetch teams
		const { data: teams, error: teamsError } = await supabase
			.from("teams")
			.select("id, name")
			.order("name");

		if (teamsError) {
			setError("Failed to fetch teams");
			return;
		}

		setTeams(teams);

		// Fetch all players first
		const { data: players, error: playersError } = await supabase
			.from("players")
			.select("id, name, team_id");

		if (playersError) {
			setError("Failed to fetch players");
			return;
		}

		// Then fetch stats for the selected season
		const { data: stats, error: statsError } = await supabase
			.from("player_stats")
			.select("*")
			.eq("season_id", selectedSeason);

		if (statsError) {
			setError("Failed to fetch player stats");
			return;
		}

		// Combine players with their stats
		const playersWithStats = players.map((player) => ({
			...player,
			stats: stats?.find((stat) => stat.player_id === player.id) || null,
		}));

		setPlayers(playersWithStats);
	}

	async function handleStatsUpdate(
		playerId: string,
		stats: Partial<PlayerStats>
	) {
		// Check if stats exist for this player and season
		const { data: existingStats } = await supabase
			.from("player_stats")
			.select("id")
			.eq("player_id", playerId)
			.eq("season_id", selectedSeason)
			.single();

		const statsData = {
			games_played: stats.games_played,
			goals: stats.goals,
			assists: stats.assists,
			points: (stats.goals ?? 0) + (stats.assists ?? 0),
		};

		let error;
		let updatedStats;
		if (existingStats) {
			// Update existing stats
			const result = await supabase
				.from("player_stats")
				.update(statsData)
				.eq("id", existingStats.id)
				.select()
				.single();
			error = result.error;
			updatedStats = result.data;
		} else {
			// Insert new stats
			const result = await supabase
				.from("player_stats")
				.insert([
					{
						...statsData,
						player_id: playerId,
						season_id: selectedSeason,
						team_id: stats.team_id,
					},
				])
				.select()
				.single();
			error = result.error;
			updatedStats = result.data;
		}

		if (error) {
			setError("Failed to save player stats");
			return;
		}

		// Update local state immediately
		setPlayers((prevPlayers) =>
			prevPlayers.map((player) =>
				player.id === playerId ? { ...player, stats: updatedStats } : player
			)
		);

		setEditingStats(null);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Player Statistics Management</h1>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="mb-6">
				<Label htmlFor="season">Select Season</Label>
				<select
					id="season"
					className="w-full p-2 border rounded mt-1"
					value={selectedSeason}
					onChange={(e) => setSelectedSeason(e.target.value)}
				>
					<option value="">Select a season...</option>
					{seasons.map((season) => (
						<option key={season.id} value={season.id}>
							{season.name}
						</option>
					))}
				</select>
			</div>

			{selectedSeason && (
				<div className="space-y-6">
					{teams.map((team) => (
						<div key={team.id} className="border rounded-lg p-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">{team.name}</h2>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="bg-gray-700">
											<th className="p-2 text-left">Player</th>
											<th className="p-2 text-center">Games Played</th>
											<th className="p-2 text-center">Goals</th>
											<th className="p-2 text-center">Assists</th>
											<th className="p-2 text-center">Points</th>
											<th className="p-2 text-center">Actions</th>
										</tr>
									</thead>
									<tbody>
										{players
											.filter((player) => player.team_id === team.id)
											.map((player) => (
												<tr
													key={player.id}
													className={`border-t ${editingStats?.player_id === player.id ? "bg-gray-50/50 dark:bg-gray-800/50" : ""}`}
												>
													<td className="p-2">{player.name}</td>
													{editingStats?.player_id === player.id ? (
														<>
															<td className="p-2">
																<Input
																	type="number"
																	value={editingStats.games_played}
																	onChange={(e) =>
																		setEditingStats({
																			...editingStats,
																			games_played: parseInt(e.target.value),
																		})
																	}
																	className="w-20 text-center"
																/>
															</td>
															<td className="p-2">
																<Input
																	type="number"
																	value={editingStats.goals}
																	onChange={(e) =>
																		setEditingStats({
																			...editingStats,
																			goals: parseInt(e.target.value),
																		})
																	}
																	className="w-20 text-center"
																/>
															</td>
															<td className="p-2">
																<Input
																	type="number"
																	value={editingStats.assists}
																	onChange={(e) =>
																		setEditingStats({
																			...editingStats,
																			assists: parseInt(e.target.value),
																		})
																	}
																	className="w-20 text-center"
																/>
															</td>
															<td className="p-2 text-center">
																{editingStats.goals + editingStats.assists}
															</td>
															<td className="p-2 text-center">
																<Button
																	onClick={() =>
																		handleStatsUpdate(player.id, editingStats)
																	}
																	className="mr-2"
																>
																	OK
																</Button>
																<Button
																	variant="outline"
																	onClick={() => setEditingStats(null)}
																>
																	Cancel
																</Button>
															</td>
														</>
													) : (
														<>
															<td className="p-2 text-center">
																{player.stats?.games_played || 0}
															</td>
															<td className="p-2 text-center">
																{player.stats?.goals || 0}
															</td>
															<td className="p-2 text-center">
																{player.stats?.assists || 0}
															</td>
															<td className="p-2 text-center">
																{player.stats?.points || 0}
															</td>
															<td className="p-2 text-center">
																<Button
																	onClick={() =>
																		setEditingStats({
																			id: player.stats?.id || "",
																			season_id: selectedSeason,
																			player_id: player.id,
																			team_id: team.id,
																			games_played:
																				player.stats?.games_played || 0,
																			goals: player.stats?.goals || 0,
																			assists: player.stats?.assists || 0,
																			points:
																				(player.stats?.goals || 0) +
																				(player.stats?.assists || 0),
																		})
																	}
																>
																	Edit
																</Button>
															</td>
														</>
													)}
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
