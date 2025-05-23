import { Team } from "@/types/teams";

export async function getTeams(): Promise<Team[]> {
	const response = await fetch("/api/teams", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to fetch teams");
	}

	const data = await response.json();
	return data as Team[];
}
