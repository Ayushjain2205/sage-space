export interface FormData {
  name: string;
  ticker: string;
  description: string;
  type: string;
  image: string | null;
  telegramBotName: string;
  telegramToken: string;
  specialties: string[];
  knowledgeFiles: File[];
  knowledgeLinks: string[];
  personality: string;
  firstMessage: string;
  lore: string;
  style: string;
  adjectives: string[];
  framework: "eliza" | "goat" | "zerepy";
  imageGeneration: boolean;
  videoGeneration: boolean;
  voiceChat: boolean;
  enableTelegram: boolean;
  launchType: string;
  actionCapabilities: string[];
}
