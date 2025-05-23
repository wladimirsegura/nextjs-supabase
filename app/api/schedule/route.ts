import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const supabase = await createClient();

		// First get the active season
		const { data: seasonData, error: seasonError } = await supabase
			.from("seasons")
			.select("id")
			.eq("is_active", true)
			.single();

		if (seasonError) {
			console.error("Error fetching active season:", seasonError);
			return NextResponse.json(
				{ error: "Failed to fetch active season" },
				{ status: 500 }
			);
		}

		// Then get the schedule with related data
		const { data: schedule, error: scheduleError } = await supabase
			.from("schedule")
			.select(
				`
				id,
				status,
				slot:game_slots (slot_date, start_time, end_time),
				home_team:teams!home_team_id (id, name, logo_url, abbreviation),
				away_team:teams!away_team_id (id, name, logo_url, abbreviation),
				referee_team:teams!referee_team_id (id, name, logo_url, abbreviation),
				record_team:teams!record_team_id (id, name, logo_url, abbreviation),
				game:games (id, home_score, away_score, period, clock, status, winner_id)
			`
			)
			.eq("season_id", seasonData.id)
			.order("slot(slot_date)", { ascending: true })
			.order("slot(start_time)", { ascending: true });

		if (scheduleError) {
			console.error("Error fetching schedule:", scheduleError);
			return NextResponse.json(
				{ error: "Failed to fetch schedule" },
				{ status: 500 }
			);
		}

		return NextResponse.json(schedule);
	} catch (error) {
		console.error("Internal server error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
