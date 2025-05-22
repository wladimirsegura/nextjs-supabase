import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/app/protected/actions";
import {
	registerPlayerAction,
	updatePlayerAction,
} from "@/app/protected/player-actions";

export default async function ProfilePage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	// Fetch player data if exists
	const { data: player } = await supabase
		.from("players")
		.select("*, teams(name)")
		.eq("user_id", user.id)
		.single();

	// Fetch available teams for registration
	const { data: teams } = await supabase.from("teams").select("*");

	return (
		<div className="flex-1 w-full flex flex-col gap-6 max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold">Profile Settings</h1>

			{/* User Profile Section */}
			<div className="space-y-4 p-4 border rounded-lg">
				<h2 className="text-xl font-semibold">User Information</h2>
				<form action={updateProfileAction} className="space-y-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							defaultValue={user.email}
							disabled
						/>
					</div>

					<div>
						<Label htmlFor="password">New Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Enter new password"
						/>
					</div>

					<div>
						<Label htmlFor="confirmPassword">Confirm New Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Confirm new password"
						/>
					</div>

					<Button type="submit">Update Password</Button>
				</form>
			</div>

			{/* Player Information Section */}
			<div className="space-y-4 p-4 border rounded-lg">
				<h2 className="text-xl font-semibold">Player Information</h2>

				{player ? (
					<form action={updatePlayerAction} className="space-y-4">
						<div>
							<Label htmlFor="name">Player Name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								defaultValue={player.name}
								required
							/>
						</div>

						<div>
							<Label htmlFor="team_id">Team</Label>
							<select
								id="team_id"
								name="team_id"
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								defaultValue={player.team_id}
								required
							>
								<option value="">Select a team</option>
								{teams?.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<Label htmlFor="number">Jersey Number</Label>
							<Input
								id="number"
								name="number"
								type="text"
								defaultValue={player.number}
								placeholder="Enter your jersey number"
								required
							/>
						</div>

						<div>
							<Label htmlFor="photo_url">Photo URL</Label>
							<Input
								id="photo_url"
								name="photo_url"
								type="url"
								defaultValue={player.photo_url || ""}
								placeholder="https://example.com/photo.jpg"
							/>
						</div>

						<Button type="submit">Update Player Info</Button>
					</form>
				) : (
					<form action={registerPlayerAction} className="space-y-4">
						<div>
							<Label htmlFor="name">Player Name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="Enter your player name"
								required
							/>
						</div>

						<div>
							<Label htmlFor="team_id">Team</Label>
							<select
								id="team_id"
								name="team_id"
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								required
							>
								<option value="">Select a team</option>
								{teams?.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<Label htmlFor="number">Jersey Number</Label>
							<Input
								id="number"
								name="number"
								type="text"
								placeholder="Enter your jersey number"
								required
							/>
						</div>

						<div>
							<Label htmlFor="photo_url">Photo URL</Label>
							<Input
								id="photo_url"
								name="photo_url"
								type="url"
								placeholder="https://example.com/photo.jpg"
							/>
						</div>

						<Button type="submit">Register as Player</Button>
					</form>
				)}
			</div>
		</div>
	);
}
