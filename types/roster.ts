export interface PlayerStats {
	games_played: number;
	goals: number;
	assists: number;
	points: number;
}

export interface User {
	email: string | null;
}

export interface RosterPlayer {
	id: string;
	name: string;
	number: string | null;
	position: string | null;
	photo_url: string | null;
	is_active: boolean;
	is_helper: boolean;
	user: User | null;
	stats: PlayerStats | null;
}

export type TeamRoster = RosterPlayer[];
