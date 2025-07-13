import { create } from "zustand";
import { persist } from "zustand/middleware";
import uuid from "react-native-uuid";

export type Message = {
  id: string;
  text: string;
  from: "user" | "bot";
  timestamp: string;
  isLoading?: boolean;
};

type ChatState = {
  usedVoiceLastTurn: boolean;
  messages: Message[];
  addMessage: (
    text: string,
    from: "user" | "bot",
    voice?: boolean,
    id?: string,
    isLoading?: boolean
  ) => void;
  updateMessage: (
    id: string,
    updatedFields: Partial<Omit<Message, "id">>
  ) => void;
  resetChat: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      usedVoiceLastTurn: false,
      messages: [],

      addMessage: async (text, from, voice = false, id, isLoading = false) => {
        const messageId = id ?? uuid.v4().toString();

        const newMessage: Message = {
          id: messageId,
          text,
          from,
          isLoading,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        };

        console.log(`[addMessage] Adding message:`, newMessage);

        set((state) => ({
          messages: [...state.messages, newMessage],
          usedVoiceLastTurn: from === "user" ? voice : state.usedVoiceLastTurn,
        }));
      },

      updateMessage: (id, updatedFields) => {
        console.log(
          `[updateMessage] Updating message with id: ${id}`,
          updatedFields
        );

        set((state) => {
          const existing = state.messages.find((msg) => msg.id === id);
          if (!existing) {
            console.warn(`[updateMessage] Message with id ${id} not found`);
          }

          const updatedMessages = state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updatedFields } : msg
          );

          return { messages: updatedMessages };
        });
      },

      resetChat: () => {
        console.log(`[resetChat] Resetting chat`);
        set({
          usedVoiceLastTurn: false,
          messages: [],
        });
      },
    }),
    {
      name: "chatStorage",
    }
  )
);
