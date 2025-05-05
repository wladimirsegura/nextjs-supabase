"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Team {
	id: string;
	name: string;
	logo_url: string | null;
	abbreviation: string | null;
}

export default function TeamsPage() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [editingTeam, setEditingTeam] = useState<Team | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		logo_url: "",
		abbreviation: "",
	});
	const [error, setError] = useState<string | null>(null);
	const supabase = createClient();

	useEffect(() => {
		fetchTeams();
	}, []);

	async function fetchTeams() {
		const { data, error } = await supabase
			.from("teams")
			.select("*")
			.order("name");

		if (error) {
			setError("Failed to fetch teams");
			return;
		}

		setTeams(data);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (!formData.name.trim()) {
			setError("Team name is required");
			return;
		}

		const { name, logo_url, abbreviation } = formData;

		if (editingTeam) {
			const { error } = await supabase
				.from("teams")
				.update({
					name,
					logo_url: logo_url || null,
					abbreviation: abbreviation || null,
				})
				.eq("id", editingTeam.id);

			if (error) {
				setError("Failed to update team");
				return;
			}
		} else {
			const { error } = await supabase
				.from("teams")
				.insert([
					{
						name,
						logo_url: logo_url || null,
						abbreviation: abbreviation || null,
					},
				]);

			if (error) {
				setError("Failed to create team");
				return;
			}
		}

		setFormData({ name: "", logo_url: "", abbreviation: "" });
		setEditingTeam(null);
		fetchTeams();
	}

	function handleEdit(team: Team) {
		setEditingTeam(team);
		setFormData({
			name: team.name,
			logo_url: team.logo_url || "",
			abbreviation: team.abbreviation || "",
		});
	}

	async function handleDelete(id: string) {
		if (!confirm("Are you sure you want to delete this team?")) return;

		const { error } = await supabase.from("teams").delete().eq("id", id);

		if (error) {
			setError("Failed to delete team");
			return;
		}

		fetchTeams();
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Manage Teams</h1>

			<form onSubmit={handleSubmit} className="space-y-4 mb-8">
				<div>
					<Label htmlFor="name">Team Name *</Label>
					<Input
						id="name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						placeholder="Enter team name"
					/>
				</div>

				<div>
					<Label htmlFor="abbreviation">Abbreviation</Label>
					<Input
						id="abbreviation"
						value={formData.abbreviation}
						onChange={(e) =>
							setFormData({ ...formData, abbreviation: e.target.value })
						}
						placeholder="Enter team abbreviation"
					/>
				</div>

				<div>
					<Label htmlFor="logo_url">Logo URL</Label>
					<Input
						id="logo_url"
						value={formData.logo_url}
						onChange={(e) =>
							setFormData({ ...formData, logo_url: e.target.value })
						}
						placeholder="Enter logo URL"
					/>
				</div>

				{error && <p className="text-red-500">{error}</p>}

				<Button type="submit">
					{editingTeam ? "Update Team" : "Add Team"}
				</Button>

				{editingTeam && (
					<Button
						type="button"
						variant="outline"
						className="ml-2"
						onClick={() => {
							setEditingTeam(null);
							setFormData({ name: "", logo_url: "", abbreviation: "" });
						}}
					>
						Cancel
					</Button>
				)}
			</form>

			<div className="space-y-4">
				{teams.map((team) => (
					<div
						key={team.id}
						className="flex items-center justify-between p-4 border rounded-lg"
					>
						<div className="flex items-center space-x-4">
							{team.logo_url && (
								<img
									src={team.logo_url}
									alt={`${team.name} logo`}
									className="w-10 h-10 object-contain"
								/>
							)}
							<div>
								<h3 className="font-medium">{team.name}</h3>
								{team.abbreviation && (
									<p className="text-sm text-gray-500">{team.abbreviation}</p>
								)}
							</div>
						</div>
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleEdit(team)}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => handleDelete(team.id)}
							>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
