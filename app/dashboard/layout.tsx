"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "/dashboard", label: "Overview", icon: "📊" },
	{ href: "/dashboard/player-stats", label: "Player Stats", icon: "👤" },
	{ href: "/dashboard/teams", label: "Teams", icon: "🏃" },
	{ href: "/dashboard/schedules", label: "Schedules", icon: "📅" },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen bg-background">
			{/* Sidebar Navigation */}
			<aside className="w-48 border-r bg-gray-900/5 dark:bg-gray-900/20">
				<nav className="flex flex-col gap-1 p-2">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
								pathname === item.href
									? "bg-gray-900/10 text-gray-900 dark:bg-gray-50/10 dark:text-gray-50"
									: "text-gray-600 hover:bg-gray-900/5 dark:text-gray-400 dark:hover:bg-gray-50/5"
							)}
						>
							<span className="text-base">{item.icon}</span>
							<span className="truncate">{item.label}</span>
						</Link>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-y-auto p-8">{children}</main>
		</div>
	);
}
