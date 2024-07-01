"use client";

import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/apolloClient";
import {
  ADD_CHARACTERISTIC,
  DELETE_CHATBOT,
  UPDATE_CHATBOT,
} from "@/graphql/mutations";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { Copy, Trash, Variable } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditChatbot({
  params: { id },
}: {
  params: { id: string };
}) {
  const [url, setUrl] = useState<string>("");
  const [chatbotName, setChatbotName] = useState<string>("");
  const [newCharacteristic, setNewCharacteristic] = useState<string>("");

  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
    awaitRefetchQueries: true,
  });

  const [updateChatbot] = useMutation(UPDATE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
    awaitRefetchQueries: true,
  });

  const [addNewCharacteristic] = useMutation(ADD_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
    // awaitRefetchQueries: true,
  });

  const { data, loading, error } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;
    setUrl(url);
  }, [id]);

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chatbot?"
    );
    if (!isConfirmed) return;

    try {
      const promise = deleteChatbot({ variables: { id } });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Chatbot successfully deleted!",
        error: "Failed to delete chatbot",
      });
    } catch (e) {
      console.error("Error deleting chatbot: ", e);
    }
  };

  const handleUpdateChatbot = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const promise = updateChatbot({
        variables: {
          id,
          name: chatbotName,
        },
      });

      toast.promise(promise, {
        loading: "Updating...",
        success: "Chatbot successfully updated!",
        error: "Failed to update chatbot",
      });
    } catch (error) {
      console.error("Failed to update chatbot ", error);
    }
  };

  const addCharacteristic = async (content: string) => {
    try {
      const promise = addNewCharacteristic({
        variables: {
          chatbotId: Number(id),
          content,
          created_at: new Date(),
        },
      });

      toast.promise(promise, {
        loading: "Adding characteristic...",
        success: "Characteristic successfully added!",
        error: "Failed to add characteristic",
      });
    } catch (e) {
      console.error("Failed to add characteristic", e);
    }
  };

  const handleAddCharacteristic = async (e: FormEvent) => {
    e.preventDefault();
    addCharacteristic(newCharacteristic);
    setNewCharacteristic("");
  };

  if (loading) {
    return (
      <div className="mx-auto animate-spin p-10">
        <Avatar seed="Support Agent" />
      </div>
    );
  }

  if (error) return <p>Error: {error.message} </p>;

  if (!data?.chatbots) return redirect("/view-chatbots");

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-blue-400">
        <h2 className="text-white text-sm font-bold">Link to chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your customers to start conversations with your
          chatbot
        </p>
        <div className="flex items-center gap-2">
          <Link href={url} className="w-full cursor-pointer hover:opacity-50">
            <Input value={url} readOnly className="cursor-pointer" />
          </Link>
          <Button
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button
          variant="destructive"
          className="absolute top-2 right-2"
          onClick={() => handleDelete(id)}
        >
          <Trash className="h-5 w-5" />
        </Button>

        <div className="flex space-x-4 mt-4">
          <Avatar seed={chatbotName} />
          <form
            onSubmit={handleUpdateChatbot}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder={chatbotName}
              className="w-full border-none bg-transparent text-xl font-bold shadow-sm"
            />
            <Button type="submit" disabled={!chatbotName}>
              Update
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10">Heres what your AI knows...</h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversations with your customers and users.
        </p>

        <div className="space-y-4 mt-4 bg-gray-200 p-5 rounded-md">
          <form
            onSubmit={handleAddCharacteristic}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              type="text"
              placeholder="Example: If customer asks for prices, provide pricing page: www.example.com/pricing"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-4">
            {data?.chatbots?.chatbot_characteristics?.map((characteristic) => {
              return (
                <Characteristic
                  key={characteristic.id}
                  characteristic={characteristic}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
