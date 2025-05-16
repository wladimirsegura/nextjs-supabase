"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const updateProfileAction = async (formData: FormData) => {
	const supabase = await createClient();
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	// If password fields are filled, update password
	if (password || confirmPassword) {
		if (!password || !confirmPassword) {
			return encodedRedirect(
				"error",
				"/protected/profile",
				"Both password fields are required for password update"
			);
		}

		if (password !== confirmPassword) {
			return encodedRedirect(
				"error",
				"/protected/profile",
				"Passwords do not match"
			);
		}

		const { error: updateError } = await supabase.auth.updateUser({
			password,
		});

		if (updateError) {
			return encodedRedirect(
				"error",
				"/protected/profile",
				"Failed to update password"
			);
		}
	}

	return encodedRedirect(
		"success",
		"/protected/profile",
		"Profile updated successfully"
	);
};
