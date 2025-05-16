"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const registerPlayerAction = async (formData: FormData) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"You must be logged in to register as a player"
		);
	}

	const name = formData.get("name") as string;
	const teamId = formData.get("team_id") as string;
	const jerseyNumber = formData.get("jersey_number") as string;
	const photoUrl = formData.get("photo_url") as string;

	if (!name || !teamId || !jerseyNumber) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Name, team, and jersey number are required"
		);
	}

	// Create team request
	const { error: requestError } = await supabase.from("team_requests").insert({
		user_id: user.id,
		team_id: teamId,
		jersey_number: jerseyNumber,
		status: "pending",
	});

	if (requestError) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Failed to submit team request"
		);
	}

	return encodedRedirect(
		"success",
		"/protected/profile",
		"Team request submitted successfully"
	);
};

export const updatePlayerAction = async (formData: FormData) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"You must be logged in to update player information"
		);
	}

	const name = formData.get("name") as string;
	const photoUrl = formData.get("photo_url") as string;

	if (!name) {
		return encodedRedirect("error", "/protected/profile", "Name is required");
	}

	// Get the player record
	const { data: player } = await supabase
		.from("players")
		.select()
		.eq("user_id", user.id)
		.single();

	if (!player) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Player record not found"
		);
	}

	// Update player information
	const { error: updateError } = await supabase
		.from("players")
		.update({
			name,
			photo_url: photoUrl,
		})
		.eq("id", player.id);

	if (updateError) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Failed to update player information"
		);
	}

	return encodedRedirect(
		"success",
		"/protected/profile",
		"Player information updated successfully"
	);
};
