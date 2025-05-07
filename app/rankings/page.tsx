"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
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
	abbreviation?: string;
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

export default function TeamRankings() {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedSeason, setSelectedSeason] = useState("");
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
		// Set the latest season as default
		if (seasons && seasons.length > 0) {
			setSelectedSeason(seasons[0].id);
		}
	}

	async function fetchTeamsAndStats() {
		// Fetch teams with abbreviations
		const { data: teams, error: teamsError } = await supabase
			.from("teams")
			.select("id, name, abbreviation")
			.order("name");

		if (teamsError) {
			setError("Failed to fetch teams");
			return;
		}

		setTeams(
			teams.map((team) => ({
				id: team.id,
				name: team.name,
				abbreviation: team.abbreviation,
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

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Team Rankings</h1>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="mb-6">
				<Label htmlFor="season">Select Season</Label>
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

			{selectedSeason && (
				<div>
					<TeamRankingTable teams={teams} />
				</div>
			)}
		</div>
	);
}
