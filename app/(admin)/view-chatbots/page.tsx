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
  const {
    data: { chatbotsByUser },
  } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserDataVariables
  >({
    query: GET_CHATBOT_BY_USER,
    variables: {
      clerk_user_id: userId,
    },
  });

  console.log(">>> DATA: ()", chatbotsByUser, typeof chatbotsByUser);

  const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

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
              <li className="relative p-10 border rounded-md max-w-3xl bg-white hover:shadow-md hover:bg-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar seed={chatbot.name} />
                    <h2 className="text-xl font-bold">{chatbot.name}</h2>
                  </div>

                  <p className="absolute top-5 right-5 text-xs text-gray-400">
                    Created: {new Date(chatbot.created_at).toLocaleString()}
                  </p>
                </div>
                <hr className="mt-2" />
                <div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
                  <h3 className="italic">Characteristics</h3>
                  <ul className="text-xs">
                    {chatbot.chatbot_characteristics.length === 0 && (
                      <p>No Characteristics added yet.</p>
                    )}
                    {chatbot.chatbot_characteristics.map((characteristic) => {
                      return (
                        <li
                          className="list-disc break-words"
                          key={characteristic.id}
                        >
                          {characteristic.content}
                        </li>
                      );
                    })}
                  </ul>

                  <h3 className="italic">No of Sessions</h3>
                  <p>{chatbot.chat_sessions.length}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
