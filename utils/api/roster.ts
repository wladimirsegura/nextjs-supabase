import { TeamRoster } from "@/types/roster";

export async function getTeamRoster(teamId: string): Promise<TeamRoster> {
	try {
		const response = await fetch(`/api/teams/${teamId}/roster`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to fetch team roster");
		}

		const data = await response.json();
		return data as TeamRoster;
	} catch (error) {
		console.error("Error fetching team roster:", error);
		throw error;
	}
}
