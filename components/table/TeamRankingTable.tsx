"use client";

import { useMemo, useState, useEffect } from "react";

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
	abbreviation?: string;
};

type TeamRankingTableProps = {
	teams: Team[];
};

export default function TeamRankingTable({ teams }: TeamRankingTableProps) {
	const isMobile =
		typeof window !== "undefined" ? window.innerWidth <= 640 : false;
	const [isNarrowScreen, setIsNarrowScreen] = useState(isMobile);

	useEffect(() => {
		const handleResize = () => {
			setIsNarrowScreen(window.innerWidth <= 640);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
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
		<div className="overflow-x-auto rounded-lg border border-[hsl(var(--table-border))]">
			<table className="w-full min-w-[390px] text-sm md:text-base">
				<thead>
					<tr className="bg-[hsl(var(--table-header))] text-[hsl(var(--foreground))]">
						<th className="p-1 md:p-2 text-center">#</th>
						<th className="p-1 md:p-2 text-left">Team</th>
						<th className="p-1 md:p-2 text-center">GP</th>
						<th className="p-1 md:p-2 text-center">W</th>
						<th className="p-1 md:p-2 text-center">L</th>
						<th className="p-1 md:p-2 text-center">T</th>
						<th className="p-1 md:p-2 text-center">GF</th>
						<th className="p-1 md:p-2 text-center">GA</th>
						<th className="p-1 md:p-2 text-center">GD</th>
						<th className="p-1 md:p-2 text-center">Pts</th>
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
							<tr
								key={team.id}
								className="border-t border-[hsl(var(--table-border))] hover:bg-[hsl(var(--table-row-hover))] transition-colors"
							>
								<td className="p-1 md:p-2 text-center text-sm md:text-base">
									{index + 1}
								</td>
								<td className="p-1 md:p-2 font-medium">
									{isNarrowScreen && team.abbreviation
										? team.abbreviation
										: team.name}
								</td>
								<td className="p-1 md:p-2 text-center">{stats.games_played}</td>
								<td className="p-1 md:p-2 text-center">{stats.wins}</td>
								<td className="p-1 md:p-2 text-center">{stats.losses}</td>
								<td className="p-1 md:p-2 text-center">{stats.ties}</td>
								<td className="p-1 md:p-2 text-center">{stats.goals_for}</td>
								<td className="p-1 md:p-2 text-center">
									{stats.goals_against}
								</td>
								<td className="p-1 md:p-2 text-center">{gd}</td>
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
