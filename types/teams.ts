export type Team = {
	id: string;
	name: string;
	logo_url: string | null;
	abbreviation: string | null;
};

export type TeamResponse = {
	error?: string;
	teams?: Team[];
};
