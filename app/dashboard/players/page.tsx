"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Player = {
	id: string;
	team_id: string;
	number: string;
	name: string;
	position: string;
	is_active: boolean;
	is_helper: boolean;
};

type Team = {
	id: string;
	name: string;
};

export default function PlayersManagement() {
	const [players, setPlayers] = useState<Player[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedTeam, setSelectedTeam] = useState("");
	const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
	const [formData, setFormData] = useState({
		number: "",
		name: "",
		position: "",
		is_active: true,
		is_helper: false,
	});

	const supabase = createClient();

	useEffect(() => {
		fetchTeams();
		if (selectedTeam) {
			fetchPlayers();
		}
	}, [selectedTeam]);

	async function fetchTeams() {
		const { data: teams, error } = await supabase
			.from("teams")
			.select("id, name")
			.order("name");

		if (error) {
			console.error("Error fetching teams:", error);
			return;
		}

		setTeams(teams);
	}

	async function fetchPlayers() {
		if (!selectedTeam) return;

		const { data: players, error } = await supabase
			.from("players")
			.select("*")
			.eq("team_id", selectedTeam)
			.order("number");

		if (error) {
			console.error("Error fetching players:", error);
			return;
		}

		setPlayers(players);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!selectedTeam) {
			alert("Please select a team");
			return;
		}

		const playerData = {
			team_id: selectedTeam,
			...formData,
		};

		if (editingPlayer) {
			const { error } = await supabase
				.from("players")
				.update(playerData)
				.eq("id", editingPlayer.id);

			if (error) {
				console.error("Error updating player:", error);
				return;
			}
		} else {
			const { error } = await supabase.from("players").insert([playerData]);

			if (error) {
				console.error("Error creating player:", error);
				return;
			}
		}

		setFormData({
			number: "",
			name: "",
			position: "",
			is_active: true,
			is_helper: false,
		});
		setEditingPlayer(null);
		fetchPlayers();
	}

	function handleEdit(player: Player) {
		setEditingPlayer(player);
		setFormData({
			number: player.number,
			name: player.name,
			position: player.position,
			is_active: player.is_active,
			is_helper: player.is_helper,
		});
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Players Management</h1>

			<div className="mb-6">
				<Label htmlFor="team">Select Team</Label>
				<select
					id="team"
					className="w-full p-2 border rounded mt-1"
					value={selectedTeam}
					onChange={(e) => setSelectedTeam(e.target.value)}
				>
					<option value="">Select a team...</option>
					{teams.map((team) => (
						<option key={team.id} value={team.id}>
							{team.name}
						</option>
					))}
				</select>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4 mb-8">
				<div>
					<Label htmlFor="number">Number</Label>
					<Input
						id="number"
						type="text"
						value={formData.number}
						onChange={(e) =>
							setFormData({ ...formData, number: e.target.value })
						}
					/>
				</div>

				<div>
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						type="text"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
					/>
				</div>

				<div>
					<Label htmlFor="position">Position</Label>
					<select
						id="position"
						className="w-full p-2 border rounded"
						value={formData.position}
						onChange={(e) =>
							setFormData({ ...formData, position: e.target.value })
						}
						required
					>
						<option value="">Select position...</option>
						<option value="FW">Forward (FW)</option>
						<option value="C">Center (C)</option>
						<option value="DF">Defense (DF)</option>
						<option value="HP">Helper (HP)</option>
					</select>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="is_active"
						checked={formData.is_active}
						onCheckedChange={(checked) =>
							setFormData({ ...formData, is_active: checked as boolean })
						}
					/>
					<Label htmlFor="is_active">Active</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="is_helper"
						checked={formData.is_helper}
						onCheckedChange={(checked) =>
							setFormData({ ...formData, is_helper: checked as boolean })
						}
					/>
					<Label htmlFor="is_helper">Helper</Label>
				</div>

				<Button type="submit">
					{editingPlayer ? "Update Player" : "Add Player"}
				</Button>
			</form>

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Position</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{players.map((player) => (
							<tr key={player.id} className="border-b">
								<td className="px-4 py-2">{player.number}</td>
								<td className="px-4 py-2">{player.name}</td>
								<td className="px-4 py-2">{player.position}</td>
								<td className="px-4 py-2">
									{player.is_active ? "Active" : "Inactive"}
									{player.is_helper && " (Helper)"}
								</td>
								<td className="px-4 py-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(player)}
									>
										Edit
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
