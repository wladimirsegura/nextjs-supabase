"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type Season = {
	id: string;
	name: string;
};

type Team = {
	id: string;
	name: string;
	abbreviation?: string;
};

type GameSlot = {
	id: string;
	slot_date: string;
	start_time: string;
	end_time: string;
	game_id: string;
};

type ScheduleGame = {
	id: string;
	season_id: string;
	slot: GameSlot;
	home_team: Team;
	away_team: Team;
	referee_team: Team;
	record_team: Team;
	status: "scheduled" | "in_progress" | "completed" | "cancelled";
	game?: {
		home_score: number;
		away_score: number;
	};
};

export default function Schedule() {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [selectedSeason, setSelectedSeason] = useState("");
	const [completedGames, setCompletedGames] = useState<ScheduleGame[]>([]);
	const [upcomingGames, setUpcomingGames] = useState<ScheduleGame[]>([]);
	const [error, setError] = useState<string | null>(null);

	const supabase = createClient();

	useEffect(() => {
		fetchSeasons();
	}, []);

	useEffect(() => {
		if (selectedSeason) {
			fetchGames();
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
		if (seasons && seasons.length > 0) {
			setSelectedSeason(seasons[0].id);
		}
	}

	async function fetchGames() {
		const { data, error } = await supabase
			.from("schedule")
			.select(
				`
				id,
				season_id,
				status,
				slot:slot_id(id, slot_date, start_time, end_time, game_id),
				home_team:home_team_id(id, name, abbreviation),
				away_team:away_team_id(id, name, abbreviation),
				referee_team:referee_team_id(id, name, abbreviation),
				record_team:record_team_id(id, name, abbreviation),
				games(home_score, away_score)
			`
			)
			.eq("season_id", selectedSeason)
			.order("slot(slot_date)", { ascending: true });

		if (error) {
			setError("Failed to fetch games");
			return;
		}

		const games = data as ScheduleGame[];

		// Sort games by date and game_id
		const sortGames = (games: ScheduleGame[]) => {
			return [...games].sort((a, b) => {
				const dateA = new Date(a.slot.slot_date).getTime();
				const dateB = new Date(b.slot.slot_date).getTime();
				if (dateA === dateB) {
					return parseInt(a.slot.game_id) - parseInt(b.slot.game_id);
				}
				return dateA - dateB;
			});
		};

		setCompletedGames(
			sortGames(games.filter((game) => game.status === "completed"))
		);
		setUpcomingGames(
			sortGames(games.filter((game) => game.status === "scheduled"))
		);
	}

	return (
		<div className="w-full space-y-8">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">League Results & Schedule</h1>
				<div className="flex items-center gap-4">
					<Label htmlFor="season-select">Season:</Label>
					<select
						id="season-select"
						className="w-full p-2 border rounded mt-1 bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
						value={selectedSeason}
						onChange={(e) => setSelectedSeason(e.target.value)}
					>
						{seasons.map((season) => (
							<option key={season.id} value={season.id}>
								{season.name}
							</option>
						))}
					</select>
				</div>
			</div>

			{error && (
				<div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md">
					{error}
				</div>
			)}

			<div className="space-y-6">
				<section>
					<h2 className="text-xl font-semibold mb-4">Results</h2>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead className="bg-[hsl(var(--muted))]">
								<tr>
									<th className="p-2 text-left">Date</th>
									<th className="p-2 text-right">Home</th>
									<th className="p-2 text-center" colSpan={3}>
										Score
									</th>
									<th className="p-2 text-left">Away</th>
								</tr>
							</thead>
							<tbody>
								{completedGames.map((game) => (
									<tr
										key={game.id}
										className="border-b border-table-border hover:bg-table-row-hover"
									>
										<td className="p-2 whitespace-nowrap">
											{format(new Date(game.slot.slot_date), "MM/dd")} #
											{game.slot.game_id}
										</td>
										<td className="p-2 text-right">{game.home_team.name}</td>
										<td className="p-2 text-right">{game.game?.home_score}</td>
										<td className="p-2 text-center">-</td>
										<td className="p-2 text-left">{game.game?.away_score}</td>
										<td className="p-2">{game.away_team.name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>

				<section>
					<h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead className="bg-[hsl(var(--muted))]">
								<tr>
									<th className="p-2 text-left">Date</th>
									<th className="p-2">Home</th>
									<th className="p-2">Away</th>
									<th className="p-2 hidden sm:table-cell">Referee</th>
									<th className="p-2 hidden sm:table-cell">Record</th>
								</tr>
							</thead>
							<tbody>
								{upcomingGames.map((game) => (
									<tr
										key={game.id}
										className="border-b border-table-border hover:bg-table-row-hover"
									>
										<td className="p-2 whitespace-nowrap">
											{format(new Date(game.slot.slot_date), "MM/dd")} #
											{game.slot.game_id}
										</td>
										<td className="p-2">{game.home_team.name}</td>
										<td className="p-2">{game.away_team.name}</td>
										<td className="p-2 hidden sm:table-cell">
											{game.referee_team.abbreviation || game.referee_team.name}
										</td>
										<td className="p-2 hidden sm:table-cell">
											{game.record_team.abbreviation || game.record_team.name}
										</td>
										<td className="sm:hidden p-2">
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<button className="text-sm text-muted-foreground hover:text-foreground">
															ℹ️
														</button>
													</TooltipTrigger>
													<TooltipContent>
														<div className="text-sm">
															<p>
																主審:{" "}
																{game.referee_team.abbreviation ||
																	game.referee_team.name}
															</p>
															<p>
																記録:{" "}
																{game.record_team.abbreviation ||
																	game.record_team.name}
															</p>
														</div>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}
