"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type Player = {
	id: string;
	name: string;
	number: string;
	position: string;
	photo_url: string | null;
	is_active: boolean;
	is_helper: boolean;
	user_id: string | null;
	auth?: {
		users: {
			email: string | null;
		}[];
	} | null;
};

type EditPlayerModalProps = {
	player: Player;
	isOpen: boolean;
	onClose: () => void;
	onUpdate: () => void;
};

export default function EditPlayerModal({
	player,
	isOpen,
	onClose,
	onUpdate,
}: EditPlayerModalProps) {
	const [formData, setFormData] = useState({
		name: player.name,
		number: player.number,
		position: player.position,
		is_active: player.is_active,
		is_helper: player.is_helper,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const supabase = createClient();

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { error: updateError } = await supabase
				.from("players")
				.update(formData)
				.eq("id", player.id)
				.select("id");

			if (updateError) throw updateError;

			onUpdate();
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update player");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-background p-6 rounded-lg w-full max-w-md space-y-4 relative">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Edit Player</h2>
					{player.auth?.users[0]?.email && (
						<Badge variant="secondary" className="ml-2">
							{player.auth.users[0].email}
						</Badge>
					)}
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="number">Number</Label>
						<Input
							id="number"
							type="text"
							value={formData.number}
							onChange={(e) =>
								setFormData({ ...formData, number: e.target.value })
							}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="position">Position</Label>
						<Input
							id="position"
							type="text"
							value={formData.position}
							onChange={(e) =>
								setFormData({ ...formData, position: e.target.value })
							}
						/>
					</div>

					<div className="flex items-center gap-6">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="is_active"
								checked={formData.is_active}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, is_active: checked })
								}
							/>
							<Label htmlFor="is_active">Active</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="is_helper"
								checked={formData.is_helper}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, is_helper: checked })
								}
							/>
							<Label htmlFor="is_helper">Helper</Label>
						</div>
					</div>

					{error && <div className="text-sm text-destructive">{error}</div>}

					<div className="flex justify-end gap-2 pt-4">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
