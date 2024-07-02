import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { GET_CHATBOT_BY_USER } from "@/graphql/queries";
import serverClient from "@/lib/server/serverClient";
import {
  Chatbot,
  GetChatbotsByUserData,
  GetChatbotsByUserDataVariables,
} from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ViewChatbotsPage() {
  const { userId } = auth();

  if (!userId) return;

  // Get the chatbot for the user
  const { data: chatbotsByUser } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserDataVariables
  >({
    query: GET_CHATBOT_BY_USER,
    variables: {
      clerk_user_id: userId,
    },
  });

  console.log(">>> DATA: ()", chatbotsByUser, userId);

  // const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser ].sort(
  //   (a, b) =>
  //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  // );

  // DELETE THIS LINE:
  const sortedChatbotsByUser = [];
  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>

      {sortedChatbotsByUser?.length === 0 && (
        <div>
          <p>
            You have not created any chatbots yet, click on the button below to
            create one.
          </p>
          <Button asChild>
            <Link href="/create-chatbot">Create Chatbot</Link>
          </Button>
        </div>
      )}

      <ul className="flex flex-col space-y-5">
        {sortedChatbotsByUser?.map((chatbot) => {
          return (
            <Link href={`/edit-chatbot/${chatbot.id}`}>
              <li className="relative p-10 border rounded-md max-w-3xl bg-white">
                <div>
                  <div className="flex items-center space-x-4">
                    <Avatar seed={chatbot.name} />
                    <h2 className="text-xl font-bold">{chatbot.name}</h2>
                  </div>

                  <p className="absolute top-5 right-5 text-xs text-gray-400">
                    Created: {new Date(chatbot.created_at).toLocaleString()}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
