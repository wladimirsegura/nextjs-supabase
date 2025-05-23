export interface GameSlot {
	slot_date: string;
	start_time: string;
	end_time: string;
}

export interface Team {
	id: string;
	name: string;
	logo_url: string | null;
	abbreviation: string | null;
}

export interface Game {
	id: string;
	home_score: number;
	away_score: number;
	period: number;
	clock: string;
	status: "scheduled" | "in_progress" | "completed";
	winner_id: string | null;
}

export interface ScheduleEntry {
	id: string;
	status: "scheduled" | "in_progress" | "completed" | "cancelled";
	slot: GameSlot;
	home_team: Team;
	away_team: Team;
	referee_team: Team;
	record_team: Team;
	game: Game | null;
}

export type Schedule = ScheduleEntry[];
