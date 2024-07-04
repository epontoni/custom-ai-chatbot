import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-white m-10 rounded-md w-full">
      <h1 className="text-4xl font-light">
        Welcom to{" "}
        <span className="text-blue-400 font font-semibold">
          Custom AI Chatbot
        </span>
      </h1>
      <h2 className="mt-2 mb-10">
        Your customisable AI chat agent that helps you manage your customer
        conversations.
      </h2>
      <Button asChild>
        <Link href="/create-chatbot">
          Lets get started by creating your first chatbot
        </Link>
      </Button>
    </main>
  );
}
