import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

export default async function Home() {
	return (
		<>
			<Link href="./rankings">Team Ranking</Link>
			<Link href="./rankings/players">Players Standings</Link>
			<main className="flex-1 flex flex-col gap-6 px-4">
				<h2 className="font-medium text-xl mb-4">Next steps</h2>
				{hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
			</main>
		</>
	);
}
