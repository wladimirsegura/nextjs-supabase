import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const teamId = params.id;
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

		// Then get the team roster with stats
		const { data: roster, error: rosterError } = await supabase
			.from("players")
			.select(
				`
				id,
				name,
				number,
				position,
				photo_url,
				is_active,
				is_helper,
				stats:player_stats (games_played, goals, assists, points)
			`
			)
			.eq("team_id", teamId)
			.eq("player_stats.season_id", seasonData.id)
			.order("number");

		if (rosterError) {
			console.error("Error fetching team roster:", rosterError);
			return NextResponse.json(
				{ error: "Failed to fetch team roster" },
				{ status: 500 }
			);
		}

		return NextResponse.json(roster || []);
	} catch (error) {
		console.error("Error in team roster API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
