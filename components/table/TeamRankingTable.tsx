"use client";

import { useMemo } from "react";

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

type Team = {
	stats: TeamStats | null;
	id: string;
	name: string;
};

type TeamRankingTableProps = {
	teams: Team[];
};

export default function TeamRankingTable({ teams }: TeamRankingTableProps) {
	const sortedTeams = useMemo(() => {
		return [...teams].sort((a, b) => {
			// Ensure both teams have stats
			const statsA = a.stats || {
				points: 0,
				goals_for: 0,
				goals_against: 0,
				wins: 0,
			};
			const statsB = b.stats || {
				points: 0,
				goals_for: 0,
				goals_against: 0,
				wins: 0,
			};

			// Calculate goal differences
			const gdA = statsA.goals_for - statsA.goals_against;
			const gdB = statsB.goals_for - statsB.goals_against;

			// Sort by points
			if (statsA.points !== statsB.points) {
				return statsB.points - statsA.points;
			}

			// If points are equal, sort by goal difference
			if (gdA !== gdB) {
				return gdB - gdA;
			}

			// If goal difference is equal, sort by wins
			if (statsA.wins !== statsB.wins) {
				return statsB.wins - statsA.wins;
			}

			// If wins are equal, sort by goals for
			return statsB.goals_for - statsA.goals_for;
		});
	}, [teams]);

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="bg-gray-700">
						<th className="p-2 text-center">Pos</th>
						<th className="p-2 text-left">Team</th>
						<th className="p-2 text-center">GP</th>
						<th className="p-2 text-center">W</th>
						<th className="p-2 text-center">L</th>
						<th className="p-2 text-center">T</th>
						<th className="p-2 text-center">GF</th>
						<th className="p-2 text-center">GA</th>
						<th className="p-2 text-center">GD</th>
						<th className="p-2 text-center">Pts</th>
					</tr>
				</thead>
				<tbody>
					{sortedTeams.map((team, index) => {
						const stats = team.stats || {
							games_played: 0,
							wins: 0,
							losses: 0,
							ties: 0,
							goals_for: 0,
							goals_against: 0,
							points: 0,
						};
						const gd = stats.goals_for - stats.goals_against;

						return (
							<tr key={team.id} className="border-t">
								<td className="p-2 text-center">{index + 1}</td>
								<td className="p-2">{team.name}</td>
								<td className="p-2 text-center">{stats.games_played}</td>
								<td className="p-2 text-center">{stats.wins}</td>
								<td className="p-2 text-center">{stats.losses}</td>
								<td className="p-2 text-center">{stats.ties}</td>
								<td className="p-2 text-center">{stats.goals_for}</td>
								<td className="p-2 text-center">{stats.goals_against}</td>
								<td className="p-2 text-center">{gd}</td>
								<td className="p-2 text-center">{stats.points}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
