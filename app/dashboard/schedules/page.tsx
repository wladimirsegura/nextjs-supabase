"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type GameSlot = {
	id: string;
	slot_date: string;
	start_time: string;
	end_time: string;
	game_id: string;
	max_games: number;
};

type Schedule = {
	id: string;
	season_id: string;
	slot_id: string;
	home_team_id: string;
	away_team_id: string;
	referee_team_id: string;
	record_team_id: string;
	status: "scheduled" | "in_progress" | "completed" | "cancelled";
};

type Team = {
	id: string;
	name: string;
	abbreviation?: string;
};

type Season = {
	id: string;
	name: string;
	is_active: boolean;
};

export default function SchedulesManagement() {
	const [gameSlots, setGameSlots] = useState<GameSlot[]>([]);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [selectedSeason, setSelectedSeason] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [slotFormData, setSlotFormData] = useState({
		slot_date: "",
		game_id: "",
	});

	const [scheduleFormData, setScheduleFormData] = useState({
		id: "",
		slot_id: "",
		home_team_id: "",
		away_team_id: "",
		referee_team_id: "",
		record_team_id: "",
		status: "scheduled",
	});

	const supabase = createClient();

	useEffect(() => {
		fetchTeams();
		fetchSeasons();
	}, []);

	useEffect(() => {
		if (selectedSeason) {
			fetchGameSlots();
			fetchSchedules();
		}
	}, [selectedSeason]);

	async function fetchSeasons() {
		const { data: seasons, error } = await supabase
			.from("seasons")
			.select("*")
			.order("start_date", { ascending: false });

		if (error) {
			setError("Failed to fetch seasons");
			return;
		}

		setSeasons(seasons);
	}

	async function fetchTeams() {
		const { data: teams, error } = await supabase
			.from("teams")
			.select("id, name, abbreviation")
			.order("name");

		if (error) {
			setError("Failed to fetch teams");
			return;
		}

		setTeams(teams);
	}

	async function fetchGameSlots() {
		const { data: slots, error } = await supabase
			.from("game_slots")
			.select("*")
			.order("slot_date")
			.order("start_time");

		if (error) {
			setError("Failed to fetch game slots");
			return;
		}

		setGameSlots(slots);
	}

	async function fetchSchedules() {
		const { data: schedules, error } = await supabase
			.from("schedule")
			.select(
				`
        *,
        home_team:teams!home_team_id(name),
        away_team:teams!away_team_id(name),
        referee_team:teams!referee_team_id(name, abbreviation),
        record_team:teams!record_team_id(name, abbreviation),
        game_slot:game_slots!slot_id(*)
      `
			)
			.eq("season_id", selectedSeason)
			.order("created_at");

		if (error) {
			setError("Failed to fetch schedules");
			return;
		}

		setSchedules(schedules);
	}

	async function handleSlotSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		const { error } = await supabase.from("game_slots").insert([slotFormData]);

		if (error) {
			setError("Failed to create game slot");
			return;
		}

		setSlotFormData({
			slot_date: "",
			game_id: "",
		});

		fetchGameSlots();
	}

	async function handleScheduleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (!selectedSeason) {
			setError("Please select a season");
			return;
		}

		const scheduleData = {
			season_id: selectedSeason,
			slot_id: scheduleFormData.slot_id,
			home_team_id: scheduleFormData.home_team_id,
			away_team_id: scheduleFormData.away_team_id,
			referee_team_id: scheduleFormData.referee_team_id,
			record_team_id: scheduleFormData.record_team_id,
			status: scheduleFormData.status,
		};

		let error;
		if (scheduleFormData.id) {
			// Update existing schedule
			const { error: updateError } = await supabase
				.from("schedule")
				.update(scheduleData)
				.eq("id", scheduleFormData.id);
			error = updateError;
		} else {
			// Insert new schedule
			const { error: insertError } = await supabase
				.from("schedule")
				.insert([scheduleData]);
			error = insertError;
		}

		if (error) {
			setError(
				scheduleFormData.id
					? "Failed to update schedule"
					: "Failed to create schedule"
			);
			return;
		}

		setScheduleFormData({
			id: "",
			slot_id: "",
			home_team_id: "",
			away_team_id: "",
			referee_team_id: "",
			record_team_id: "",
			status: "scheduled",
		});

		fetchSchedules();
	}

	return (
		<div className="max-w-6xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Schedule Management</h1>

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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h2 className="text-xl font-semibold mb-4">Create Game Slot</h2>
					<form onSubmit={handleSlotSubmit} className="space-y-4">
						<div>
							<Label htmlFor="slot_date">Date</Label>
							<Input
								id="slot_date"
								type="date"
								value={slotFormData.slot_date}
								onChange={(e) =>
									setSlotFormData({
										...slotFormData,
										slot_date: e.target.value,
									})
								}
								required
							/>
						</div>

						<div>
							<Label htmlFor="game_id">Game ID</Label>
							<Input
								id="game_id"
								type="text"
								value={slotFormData.game_id}
								onChange={(e) =>
									setSlotFormData({
										...slotFormData,
										game_id: e.target.value,
									})
								}
								required
							/>
						</div>

						<Button type="submit">Create Slot</Button>
					</form>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">Schedule Game</h2>
					<form onSubmit={handleScheduleSubmit} className="space-y-4">
						<div>
							<Label htmlFor="slot_id">Game Slot</Label>
							<select
								id="slot_id"
								className="w-full p-2 border rounded"
								value={scheduleFormData.slot_id}
								onChange={(e) =>
									setScheduleFormData({
										...scheduleFormData,
										slot_id: e.target.value,
									})
								}
								required
							>
								<option value="">Select a slot...</option>
								{gameSlots.map((slot) => (
									<option key={slot.id} value={slot.id}>
										{slot.slot_date} - Game ID: {slot.game_id || "Not assigned"}
									</option>
								))}
							</select>
						</div>

						<div>
							<Label htmlFor="home_team">Home Team</Label>
							<select
								id="home_team"
								className="w-full p-2 border rounded"
								value={scheduleFormData.home_team_id}
								onChange={(e) =>
									setScheduleFormData({
										...scheduleFormData,
										home_team_id: e.target.value,
									})
								}
								required
							>
								<option value="">Select home team...</option>
								{teams.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<Label htmlFor="away_team">Away Team</Label>
							<select
								id="away_team"
								className="w-full p-2 border rounded"
								value={scheduleFormData.away_team_id}
								onChange={(e) =>
									setScheduleFormData({
										...scheduleFormData,
										away_team_id: e.target.value,
									})
								}
								required
							>
								<option value="">Select away team...</option>
								{teams
									.filter((team) => team.id !== scheduleFormData.home_team_id)
									.map((team) => (
										<option key={team.id} value={team.id}>
											{team.name}
										</option>
									))}
							</select>
						</div>

						<div>
							<Label htmlFor="referee_team">Referee Team</Label>
							<select
								id="referee_team"
								className="w-full p-2 border rounded"
								value={scheduleFormData.referee_team_id}
								onChange={(e) =>
									setScheduleFormData({
										...scheduleFormData,
										referee_team_id: e.target.value,
									})
								}
								required
							>
								<option value="">Select referee team...</option>
								{teams
									.filter(
										(team) =>
											team.id !== scheduleFormData.home_team_id &&
											team.id !== scheduleFormData.away_team_id
									)
									.map((team) => (
										<option key={team.id} value={team.id}>
											{team.name}
										</option>
									))}
							</select>
						</div>

						<div>
							<Label htmlFor="record_team">Record Team</Label>
							<select
								id="record_team"
								className="w-full p-2 border rounded"
								value={scheduleFormData.record_team_id}
								onChange={(e) =>
									setScheduleFormData({
										...scheduleFormData,
										record_team_id: e.target.value,
									})
								}
								required
							>
								<option value="">Select record team...</option>
								{teams
									.filter(
										(team) =>
											team.id !== scheduleFormData.home_team_id &&
											team.id !== scheduleFormData.away_team_id &&
											team.id !== scheduleFormData.referee_team_id
									)
									.map((team) => (
										<option key={team.id} value={team.id}>
											{team.name}
										</option>
									))}
							</select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="status">Status</Label>
							<select
								id="status"
								className="w-full p-2 border rounded-md"
								value={scheduleFormData.status}
								onChange={(e) =>
									setScheduleFormData({
										...scheduleFormData,
										status: e.target.value as Schedule["status"],
									})
								}
							>
								<option value="scheduled">Scheduled</option>
								<option value="in_progress">In Progress</option>
								<option value="completed">Completed</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>

						{error && <p className="text-red-500">{error}</p>}

						<Button type="submit">Schedule Game</Button>
					</form>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4">Scheduled Games</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-gray-600">
								<th className="px-4 py-2">Date</th>
								<th className="px-3 py-2 w-16">#</th>
								<th className="px-4 py-2">Home Team</th>
								<th className="px-4 py-2">Away Team</th>
								<th className="px-3 py-2 w-20">REF</th>
								<th className="px-3 py-2 w-20">REC</th>
								<th className="px-3 py-2 w-24">Status</th>
								<th className="px-3 py-2 w-20">Actions</th>
							</tr>
						</thead>
						<tbody>
							{schedules.map((schedule: any) => (
								<tr key={schedule.id} className="border-b">
									<td className="px-4 py-2">{schedule.game_slot.slot_date}</td>
									<td className="px-4 py-2">
										{schedule.game_slot.game_id || "Not assigned"}
									</td>
									<td className="px-4 py-2">{schedule.home_team.name}</td>
									<td className="px-4 py-2">{schedule.away_team.name}</td>
									<td className="px-4 py-2">
										{schedule.referee_team.abbreviation ||
											schedule.referee_team.name}
									</td>
									<td className="px-4 py-2">
										{schedule.record_team.abbreviation ||
											schedule.record_team.name}
									</td>
									<td className="px-3 py-2">
										{schedule.status === "scheduled" && "🕒"}
										{schedule.status === "in_progress" && "⚽"}
										{schedule.status === "completed" && "✅"}
										{schedule.status === "cancelled" && "❌"}
									</td>
									{/* <span className="ml-1 text-sm">{schedule.status}</span> */}
									<td className="px-3 py-2">
										<Button
											variant="outline"
											size="sm"
											className="w-full"
											onClick={() => {
												setScheduleFormData({
													id: schedule.id,
													slot_id: schedule.slot_id,
													home_team_id: schedule.home_team_id,
													away_team_id: schedule.away_team_id,
													referee_team_id: schedule.referee_team_id,
													record_team_id: schedule.record_team_id,
													status: schedule.status,
												});
												window.scrollTo({ top: 0, behavior: "smooth" });
											}}
										>
											✏️ Edit
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{/* <div className="space-y-2">
				<Label htmlFor="status">Status</Label>
				<select
					id="status"
					className="w-full p-2 border rounded-md"
					value={scheduleFormData.status}
					onChange={(e) =>
						setScheduleFormData({
							...scheduleFormData,
							status: e.target.value as Schedule["status"],
						})
					}
				>
					<option value="scheduled">Scheduled</option>
					<option value="in_progress">In Progress</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</div> */}
		</div>
	);
}
