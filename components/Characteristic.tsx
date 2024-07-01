import { ChatbotCharacteristics } from "@/types";
import { Badge } from "@/components/ui/badge";
import { OctagonX } from "lucide-react";
import { useMutation } from "@apollo/client";
import { REMOVE_CHARACTERISTIC } from "@/graphql/mutations";
import { toast } from "sonner";

export default function Characteristic({
  characteristic,
}: {
  characteristic: ChatbotCharacteristics;
}) {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });
  const handleRemoveCharacteristic = async (characteristicId: number) => {
    try {
      await removeCharacteristic({
        variables: {
          characteristicId,
        },
      });
    } catch (error) {
      console.error("Failed to remove characteristic", error);
    }
  };
  return (
    <li key={characteristic.id} className="relative">
      <Badge className="py-2 pr-10">
        {characteristic.content}
        <OctagonX
          className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
          onClick={() => {
            const promise = handleRemoveCharacteristic(characteristic.id);
            toast.promise(promise, {
              loading: "Removing...",
              success: "Characteristic removed",
              error: "Failed to remove characteristic",
            });
          }}
        />
      </Badge>
    </li>
  );
}
