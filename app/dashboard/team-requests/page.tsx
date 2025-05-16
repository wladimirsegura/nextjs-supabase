"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

type TeamRequest = {
	id: string;
	user_id: string;
	team_id: string;
	jersey_number: string | null;
	status: "pending" | "approved" | "rejected";
	created_at: string;
	teams: { name: string };
	user: { email: string };
};

export default function TeamRequestsPage() {
	const [requests, setRequests] = useState<TeamRequest[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		try {
			const supabase = createClient();

			// Get current session
			const {
				data: { session },
				error: sessionError,
			} = await supabase.auth.getSession();

			console.log("Session data:", {
				session: session
					? {
							user: session.user,
							expires_at: session.expires_at,
						}
					: null,
				sessionError,
			});

			if (sessionError || !session) {
				console.error("Error getting session:", sessionError);
				toast.error("Please sign in to view team requests");
				setLoading(false);
				return;
			}

			// Check if user is admin
			const { data: claims, error: claimsError } =
				await supabase.rpc("get_my_claims");

			console.log("Claims data:", { claims, claimsError });

			if (claimsError) {
				console.error("Error checking admin status:", claimsError);
				toast.error("Failed to verify permissions");
				setLoading(false);
				return;
			}

			if (!claims || !claims.claims_admin) {
				console.log("User lacks admin claims:", claims);
				toast.error("You do not have permission to view team requests");
				setLoading(false);
				return;
			}

			console.log("Fetching team requests...");
			const { data, error } = await supabase
				.from("team_requests")
				.select(
					`
				id,
				user_id,
				team_id,
				jersey_number,
				status,
				created_at,
				updated_at,
				teams (name),
				user:user_id (email)
			`
				)
				.order("created_at", { ascending: false });

			console.log("Team requests query result:", { data, error });

			if (error) {
				console.error("Error fetching team requests:", error);
				toast.error("Failed to load team requests");
				setLoading(false);
				return;
			}

			if (!data) {
				console.log("No team requests data found");
				setRequests([]);
				setLoading(false);
				return;
			}

			console.log(
				"Successfully loaded team requests:",
				data.length,
				"requests found"
			);
			setRequests(data as TeamRequest[]);
		} catch (error) {
			console.error("Unexpected error:", error);
			toast.error("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleAction = async (
		requestId: string,
		action: "approve" | "reject"
	) => {
		const supabase = createClient();
		const { data, error } = await supabase.rpc(
			action === "approve" ? "approve_team_request" : "reject_team_request",
			{ request_id: requestId }
		);

		if (error || data !== "OK") {
			console.error(`Error ${action}ing request:`, error || data);
			toast.error(`Failed to ${action} request`);
			return;
		}

		toast.success(`Request ${action}d successfully`);
		fetchRequests(); // Refresh the list
	};

	if (loading) {
		return <div className="text-center">Loading...</div>;
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Team Join Requests</h1>

			<div className="rounded-lg border bg-card">
				<div className="p-6">
					<div className="relative overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead className="bg-muted/50 text-muted-foreground">
								<tr>
									<th className="p-4">User</th>
									<th className="p-4">Team</th>
									<th className="p-4">Jersey #</th>
									<th className="p-4">Status</th>
									<th className="p-4">Requested</th>
									<th className="p-4">Actions</th>
								</tr>
							</thead>
							<tbody>
								{requests.map((request) => (
									<tr key={request.id} className="border-t">
										<td className="p-4">{request.user.email}</td>
										<td className="p-4">{request.teams.name}</td>
										<td className="p-4">{request.jersey_number || "-"}</td>
										<td className="p-4">
											<span
												className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
													request.status === "pending"
														? "bg-yellow-100 text-yellow-800"
														: request.status === "approved"
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
												}`}
											>
												{request.status}
											</span>
										</td>
										<td className="p-4">
											{new Date(request.created_at).toLocaleDateString()}
										</td>
										<td className="p-4">
											{request.status === "pending" && (
												<div className="flex gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() => handleAction(request.id, "approve")}
													>
														Approve
													</Button>
													<Button
														size="sm"
														variant="outline"
														className="text-red-600 hover:text-red-700"
														onClick={() => handleAction(request.id, "reject")}
													>
														Reject
													</Button>
												</div>
											)}
										</td>
									</tr>
								))}
								{requests.length === 0 && (
									<tr>
										<td
											colSpan={6}
											className="p-4 text-center text-muted-foreground"
										>
											No pending team requests
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
