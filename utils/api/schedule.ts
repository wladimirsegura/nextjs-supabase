import { Schedule } from "@/types/schedule";

export async function getSchedule(): Promise<Schedule> {
	const response = await fetch("/api/schedule", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to fetch schedule");
	}

	const data = await response.json();
	return data as Schedule;
}
