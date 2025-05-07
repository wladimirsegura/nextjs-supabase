"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import PlayerRankingTable from "@/components/table/PlayerRankingTable";

type Season = {
	id: string;
	name: string;
};

type Player = {
	stats: PlayerStats | null;
	id: string;
	name: string;
	team_id: string;
};

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

type SortBy = "points" | "goals" | "assists";

export default function PlayerRankings() {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [players, setPlayers] = useState<Player[]>([]);
	const [selectedSeason, setSelectedSeason] = useState("");
	const [sortBy, setSortBy] = useState<SortBy>("points");
	const [error, setError] = useState<string | null>(null);

	const supabase = createClient();

	useEffect(() => {
		fetchSeasons();
	}, []);

	useEffect(() => {
		if (selectedSeason) {
			fetchPlayersAndStats();
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
		// Set the latest season as default
		if (seasons && seasons.length > 0) {
			setSelectedSeason(seasons[0].id);
		}
	}

	async function fetchPlayersAndStats() {
		// Fetch players
		const { data: players, error: playersError } = await supabase
			.from("players")
			.select("id, name, team_id")
			.order("name");

		if (playersError) {
			setError("Failed to fetch players");
			return;
		}

		setPlayers(
			players.map((player) => ({
				id: player.id,
				name: player.name,
				team_id: player.team_id,
				stats: null,
			}))
		);

		// Fetch stats for the selected season
		const { data: stats, error: statsError } = await supabase
			.from("player_stats")
			.select("*")
			.eq("season_id", selectedSeason);

		if (statsError) {
			setError("Failed to fetch player stats");
			return;
		}

		// Combine players with their stats and filter out inactive players
		const playersWithStats = players.map((player) => ({
			...player,
			stats: stats?.find((stat) => stat.player_id === player.id) || null,
		}));

		// Filter out players with zero points or zero games played
		const activePlayersWithStats = playersWithStats.filter((player) => {
			const stats = player.stats;
			return stats && (stats.points > 0 || stats.games_played > 0);
		});

		setPlayers(activePlayersWithStats);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Player Rankings</h1>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="mb-6">
				{/* <Label htmlFor="season">Select Season</Label> */}
				<select
					id="season"
					className="w-full p-2 border rounded mt-1 bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
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

			<div className="mb-6">
				{/* <Label htmlFor="sortBy">Sort By</Label> */}
				<select
					id="sortBy"
					className="w-full p-2 border rounded mt-1 bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value as SortBy)}
				>
					<option value="points">ポイントランキング</option>
					<option value="goals">ゴールランキング</option>
					<option value="assists">アシストランキング</option>
				</select>
			</div>

			{selectedSeason && (
				<div>
					<PlayerRankingTable players={players} sortBy={sortBy} />
				</div>
			)}
		</div>
	);
}
