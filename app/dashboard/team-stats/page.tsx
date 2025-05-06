"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TeamRankingTable from "@/components/table/TeamRankingTable";

type Season = {
	id: string;
	name: string;
};

type Team = {
	stats: TeamStats | null;
	id: string;
	name: string;
};

type TeamStats = {
	id: string;
	season_id: string;
	team_id: string;
	games_played: number;
	wins: number;
	losses: number;
	ties: number;
	points: number;
	goals_for: number;
	goals_against: number;
};

export default function TeamStatsManagement() {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedSeason, setSelectedSeason] = useState("");
	const [editingStats, setEditingStats] = useState<TeamStats | null>(null);
	const [error, setError] = useState<string | null>(null);

	const supabase = createClient();

	useEffect(() => {
		fetchSeasons();
	}, []);

	useEffect(() => {
		if (selectedSeason) {
			fetchTeamsAndStats();
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

	async function fetchTeamsAndStats() {
		// Fetch teams
		const { data: teams, error: teamsError } = await supabase
			.from("teams")
			.select("id, name")
			.order("name");

		if (teamsError) {
			setError("Failed to fetch teams");
			return;
		}

		setTeams(
			teams.map((team) => ({
				id: team.id,
				name: team.name,
				stats: null,
			}))
		);

		// Fetch stats for the selected season
		const { data: stats, error: statsError } = await supabase
			.from("team_stats")
			.select("*")
			.eq("season_id", selectedSeason);

		if (statsError) {
			setError("Failed to fetch team stats");
			return;
		}

		// Combine teams with their stats
		const teamsWithStats = teams.map((team) => ({
			...team,
			stats: stats?.find((stat) => stat.team_id === team.id) || null,
		}));

		setTeams(teamsWithStats);
	}

	async function handleStatsUpdate(teamId: string, stats: Partial<TeamStats>) {
		// Check if stats exist for this team and season
		const { data: existingStats } = await supabase
			.from("team_stats")
			.select("id")
			.eq("team_id", teamId)
			.eq("season_id", selectedSeason)
			.single();

		const statsData = {
			games_played: stats.games_played,
			wins: stats.wins,
			losses: stats.losses,
			ties: stats.ties,
			points: (stats.wins || 0) * 3 + (stats.ties || 0),
			goals_for: stats.goals_for,
			goals_against: stats.goals_against,
		};

		let error;
		let updatedStats;
		if (existingStats) {
			// Update existing stats
			const result = await supabase
				.from("team_stats")
				.update(statsData)
				.eq("id", existingStats.id)
				.select()
				.single();
			error = result.error;
			updatedStats = result.data;
		} else {
			// Insert new stats
			const result = await supabase
				.from("team_stats")
				.insert([
					{
						...statsData,
						team_id: teamId,
						season_id: selectedSeason,
					},
				])
				.select()
				.single();
			error = result.error;
			updatedStats = result.data;
		}

		if (error) {
			setError("Failed to save team stats");
			return;
		}

		// Update local state immediately
		setTeams((prevTeams) =>
			prevTeams.map((team) =>
				team.id === teamId ? { ...team, stats: updatedStats } : team
			)
		);

		setEditingStats(null);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Team Statistics Management</h1>

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
				<div className="space-y-8">
					<div>
						<h2 className="text-xl font-semibold mb-4">Team Rankings</h2>
						<TeamRankingTable teams={teams} />
					</div>
					<div>
						<h2 className="text-xl font-semibold mb-4">
							Team Statistics Management
						</h2>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="bg-gray-700">
										<th className="p-2 text-left">Team</th>
										<th className="p-2 text-center">Games Played</th>
										<th className="p-2 text-center">Wins</th>
										<th className="p-2 text-center">Losses</th>
										<th className="p-2 text-center">Ties</th>
										<th className="p-2 text-center">Points</th>
										<th className="p-2 text-center">Goals For</th>
										<th className="p-2 text-center">Goals Against</th>
										<th className="p-2 text-center">Actions</th>
									</tr>
								</thead>
								<tbody>
									{teams.map((team) => (
										<tr
											key={team.id}
											className={`border-t ${editingStats?.team_id === team.id ? "bg-gray-50/50 dark:bg-gray-800/50" : ""}`}
										>
											<td className="p-2">{team.name}</td>
											{editingStats?.team_id === team.id ? (
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
															value={editingStats.wins}
															onChange={(e) =>
																setEditingStats({
																	...editingStats,
																	wins: parseInt(e.target.value),
																})
															}
															className="w-20 text-center"
														/>
													</td>
													<td className="p-2">
														<Input
															type="number"
															value={editingStats.losses}
															onChange={(e) =>
																setEditingStats({
																	...editingStats,
																	losses: parseInt(e.target.value),
																})
															}
															className="w-20 text-center"
														/>
													</td>
													<td className="p-2">
														<Input
															type="number"
															value={editingStats.ties}
															onChange={(e) =>
																setEditingStats({
																	...editingStats,
																	ties: parseInt(e.target.value),
																})
															}
															className="w-20 text-center"
														/>
													</td>
													<td className="p-2 text-center">
														{editingStats.wins * 3 + editingStats.ties}
													</td>
													<td className="p-2">
														<Input
															type="number"
															value={editingStats.goals_for}
															onChange={(e) =>
																setEditingStats({
																	...editingStats,
																	goals_for: parseInt(e.target.value),
																})
															}
															className="w-20 text-center"
														/>
													</td>
													<td className="p-2">
														<Input
															type="number"
															value={editingStats.goals_against}
															onChange={(e) =>
																setEditingStats({
																	...editingStats,
																	goals_against: parseInt(e.target.value),
																})
															}
															className="w-20 text-center"
														/>
													</td>
													<td className="p-2 text-center">
														<Button
															onClick={() =>
																handleStatsUpdate(team.id, editingStats)
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
														{team.stats?.games_played || 0}
													</td>
													<td className="p-2 text-center">
														{team.stats?.wins || 0}
													</td>
													<td className="p-2 text-center">
														{team.stats?.losses || 0}
													</td>
													<td className="p-2 text-center">
														{team.stats?.ties || 0}
													</td>
													<td className="p-2 text-center">
														{team.stats?.points || 0}
													</td>
													<td className="p-2 text-center">
														{team.stats?.goals_for || 0}
													</td>
													<td className="p-2 text-center">
														{team.stats?.goals_against || 0}
													</td>
													<td className="p-2 text-center">
														<Button
															onClick={() =>
																setEditingStats({
																	id: team.stats?.id || "",
																	season_id: selectedSeason,
																	team_id: team.id,
																	games_played: team.stats?.games_played || 0,
																	wins: team.stats?.wins || 0,
																	losses: team.stats?.losses || 0,
																	ties: team.stats?.ties || 0,
																	points: team.stats?.points || 0,
																	goals_for: team.stats?.goals_for || 0,
																	goals_against: team.stats?.goals_against || 0,
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
				</div>
			)}
		</div>
	);
}
