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
	const number = formData.get("number") as string;
	const photoUrl = formData.get("photo_url") as string;

	if (!name || !teamId || !number) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Name, team, and jersey number are required"
		);
	}

	// Check if number is already taken in the team
	const { data: existingPlayer } = await supabase
		.from("players")
		.select()
		.eq("team_id", teamId)
		.eq("number", number)
		.single();

	if (existingPlayer) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"This jersey number is already taken in the selected team"
		);
	}

	// Create player record with pending status
	const { error: playerError } = await supabase.from("players").insert({
		user_id: user.id,
		team_id: teamId,
		number: number,
		name: name,
		photo_url: photoUrl || null,
		status: "pending",
	});

	if (playerError) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Failed to register as player"
		);
	}

	return encodedRedirect(
		"success",
		"/protected/profile",
		"Player registered successfully"
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
	const teamId = formData.get("team_id") as string;
	const number = formData.get("number") as string;
	const photoUrl = formData.get("photo_url") as string;

	if (!name || !teamId || !number) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"Name, team, and jersey number are required"
		);
	}

	// Get the player record
	const { data: player } = await supabase
		.from("players")
		.select()
		.eq("user_id", user.id)
		.single();

	// Check if number is already taken in the team by another player
	const { data: existingPlayer } = await supabase
		.from("players")
		.select()
		.eq("team_id", teamId)
		.eq("number", number)
		.neq("id", player.id)
		.single();

	if (existingPlayer) {
		return encodedRedirect(
			"error",
			"/protected/profile",
			"This jersey number is already taken in the selected team"
		);
	}

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
			team_id: teamId,
			number,
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
		"Player information and team assignment updated successfully"
	);
};
