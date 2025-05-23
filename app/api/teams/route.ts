import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { Team } from "@/types/teams";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const supabase = await createClient();

		const { data: teams, error } = await supabase
			.from("teams")
			.select("id, name, logo_url, abbreviation")
			.order("name");

		if (error) {
			console.error("Database error:", error);
			return NextResponse.json<{ error: string }>(
				{ error: "Failed to fetch teams" },
				{ status: 500 }
			);
		}

		return NextResponse.json<Team[]>(teams || []);
	} catch (error) {
		console.error("Error in teams API:", error);
		return NextResponse.json<{ error: string }>(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
