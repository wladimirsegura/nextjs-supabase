"use client";

import { useEffect, useState, useCallback } from "react";
import EditPlayerModal from "./edit-player-modal";
import { createClient } from "@/utils/supabase/client";

type Team = {
	id: string;
	name: string;
	logo_url: string | null;
	abbreviation: string | null;
};

type Player = {
	id: string;
	name: string;
	number: string;
	position: string;
	photo_url: string | null;
	is_active: boolean;
	is_helper: boolean;
	user_id: string | null;
	user_email?: string | null;
	auth: { users: { email: string | null }[] } | null;
};

export default function RosterPage() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
	const [players, setPlayers] = useState<Player[]>([]);
	const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const supabase = createClient();

	useEffect(() => {
		async function fetchTeams() {
			const { data: teamsData, error } = await supabase
				.from("teams")
				.select("*")
				.order("name");

			if (error) {
				console.error("Error fetching teams:", error);
				return;
			}

			setTeams(teamsData);
		}

		fetchTeams();
	}, []);

	const fetchPlayers = useCallback(async () => {
		if (!selectedTeam) return;

		const { data: playersData, error } = await supabase
			.from("players")
			.select("*")
			.eq("team_id", selectedTeam)
			.order("number");

		if (error) {
			console.error("Error fetching players:", error);
			return;
		}

		const players = playersData.map((player) => ({
			...player,
		}));

		setPlayers(players);
	}, [selectedTeam]);

	useEffect(() => {
		fetchPlayers();
	}, [selectedTeam]);

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Team Roster Management</h1>

			{/* Team Selection */}
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
				{teams.map((team) => (
					<button
						key={team.id}
						onClick={() => setSelectedTeam(team.id)}
						className={`rounded-lg border p-4 text-center transition-colors ${selectedTeam === team.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"}`}
					>
						<div className="font-semibold">
							{team.abbreviation || team.name}
						</div>
						<div className="text-sm">{team.name}</div>
					</button>
				))}
			</div>

			{/* Player Roster */}
			{selectedTeam && (
				<div className="rounded-lg border bg-card">
					<div className="p-6">
						<h2 className="text-xl font-semibold mb-4">
							{teams.find((t) => t.id === selectedTeam)?.name} Roster
						</h2>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{players.map((player) => (
								<div
									key={player.id}
									className="flex items-center gap-4 rounded-lg border p-4 bg-background group relative"
								>
									{player.photo_url ? (
										<img
											src={player.photo_url}
											alt={player.name}
											className="h-12 w-12 rounded-full object-cover"
										/>
									) : (
										<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
											<span className="text-xl">{player.number || "#"}</span>
										</div>
									)}
									<div className="flex-grow">
										<div className="font-semibold">{player.name}</div>
										<div className="text-sm text-muted-foreground">
											#{player.number} · {player.position || "N/A"}
										</div>
										<div className="text-sm text-muted-foreground">
											{player.user_email || "No email linked"}
										</div>
										<div className="flex gap-2 mt-1">
											{!player.is_active && (
												<span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
													Inactive
												</span>
											)}
											{player.is_helper && (
												<span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
													Helper
												</span>
											)}
										</div>
									</div>
									<button
										className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-2 rounded-full hover:bg-accent transition-opacity"
										onClick={() => {
											setSelectedPlayer(player);
											setIsEditModalOpen(true);
										}}
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
											/>
										</svg>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{selectedPlayer && (
				<EditPlayerModal
					player={selectedPlayer}
					isOpen={isEditModalOpen}
					onClose={() => {
						setIsEditModalOpen(false);
						setSelectedPlayer(null);
					}}
					onUpdate={() => {
						// Refresh the players list
						if (selectedTeam) {
							fetchPlayers();
						}
					}}
				/>
			)}
		</div>
	);
}
