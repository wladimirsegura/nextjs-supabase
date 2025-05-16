"use client";

export default function DashboardPage() {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Dashboard Overview</h1>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Quick Stats Cards */}
				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Total Players</h3>
					<p className="mt-2 text-3xl font-bold">24</p>
					<p className="text-sm text-muted-foreground">Across all teams</p>
				</div>

				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Active Teams</h3>
					<p className="mt-2 text-3xl font-bold">6</p>
					<p className="text-sm text-muted-foreground">In current season</p>
				</div>

				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Total Games</h3>
					<p className="mt-2 text-3xl font-bold">32</p>
					<p className="text-sm text-muted-foreground">This season</p>
				</div>
			</div>

			<div className="rounded-lg border">
				<div className="p-6">
					<h2 className="text-xl font-semibold">Recent Activity</h2>
					<div className="mt-4 space-y-4">
						<div className="flex items-center gap-4">
							<div className="h-2 w-2 rounded-full bg-green-500"></div>
							<p>New player added to Team Eagles</p>
							<span className="ml-auto text-sm text-muted-foreground">
								2h ago
							</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="h-2 w-2 rounded-full bg-blue-500"></div>
							<p>Game schedule updated</p>
							<span className="ml-auto text-sm text-muted-foreground">
								5h ago
							</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="h-2 w-2 rounded-full bg-yellow-500"></div>
							<p>Season statistics calculated</p>
							<span className="ml-auto text-sm text-muted-foreground">
								1d ago
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
