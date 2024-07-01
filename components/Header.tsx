import Link from "next/link";
import Avatar from "@/components/Avatar";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="shadow-sm text-gray-800 flex justify-between p-5">
      <Link href="/" className="flex items-center gap-4 text-4xl font-thin">
        <Avatar seed="Suppoert Agent" />
        <div className="space-y-1">
          <h1>Custom AI Chatbot</h1>
          <h2 className="text-sm font-normal">
            Your Customisable AI Chat Agent
          </h2>
        </div>
      </Link>

      <div className="flex items-center">
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </header>
  );
}
