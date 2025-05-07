"use client";

import { useMemo } from "react";

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

type Player = {
	stats: PlayerStats | null;
	id: string;
	name: string;
	team_id: string;
};

type PlayerRankingTableProps = {
	players: Player[];
	sortBy: "points" | "goals" | "assists";
};

export default function PlayerRankingTable({
	players,
	sortBy,
}: PlayerRankingTableProps) {
	const sortedPlayers = useMemo(() => {
		return [...players].sort((a, b) => {
			// Ensure both players have stats
			const statsA = a.stats || {
				points: 0,
				goals: 0,
				assists: 0,
				games_played: 0,
			};
			const statsB = b.stats || {
				points: 0,
				goals: 0,
				assists: 0,
				games_played: 0,
			};

			// Primary sort by selected stat
			if (statsA[sortBy] !== statsB[sortBy]) {
				return statsB[sortBy] - statsA[sortBy];
			}

			// Secondary sort by points if not already sorting by points
			if (sortBy !== "points" && statsA.points !== statsB.points) {
				return statsB.points - statsA.points;
			}

			// If points are equal or sorting by points, sort by goals
			if (sortBy !== "goals" && statsA.goals !== statsB.goals) {
				return statsB.goals - statsA.goals;
			}

			// If goals are equal or sorting by goals, sort by assists
			if (sortBy !== "assists" && statsA.assists !== statsB.assists) {
				return statsB.assists - statsA.assists;
			}

			// If all stats are equal, sort by games played (ascending)
			return statsA.games_played - statsB.games_played;
		});
	}, [players, sortBy]);

	return (
		<div className="overflow-x-auto rounded-lg border border-[hsl(var(--table-border))]">
			<table className="w-full min-w-[390px] text-sm md:text-base">
				<thead>
					<tr className="bg-[hsl(var(--table-header))] text-[hsl(var(--foreground))]">
						<th className="p-1 md:p-2 text-center">#</th>
						<th className="p-1 md:p-2 text-left">Player</th>
						<th className="p-1 md:p-2 text-center">GP</th>
						<th className="p-1 md:p-2 text-center">G</th>
						<th className="p-1 md:p-2 text-center">A</th>
						<th className="p-1 md:p-2 text-center">Pts</th>
					</tr>
				</thead>
				<tbody>
					{sortedPlayers.map((player, index) => {
						const stats = player.stats || {
							games_played: 0,
							goals: 0,
							assists: 0,
							points: 0,
						};

						return (
							<tr
								key={player.id}
								className="border-t border-[hsl(var(--table-border))] hover:bg-[hsl(var(--table-row-hover))] transition-colors"
							>
								<td className="p-1 md:p-2 text-center text-sm md:text-base">
									{index + 1}
								</td>
								<td className="p-1 md:p-2 font-medium">{player.name}</td>
								<td className="p-1 md:p-2 text-center">{stats.games_played}</td>
								<td className="p-1 md:p-2 text-center">{stats.goals}</td>
								<td className="p-1 md:p-2 text-center">{stats.assists}</td>
								<td className="p-1 md:p-2 text-center font-semibold">
									{stats.points}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
