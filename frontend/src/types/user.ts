import type { EmojiStyle } from "emoji-picker-react";

/**
 * Represents a universally unique identifier.
 */
export type UUID = ReturnType<typeof crypto.randomUUID>;

export type DarkModeOptions = "system" | "auto" | "light" | "dark";

/**
 * Represents a user in the application.
 */
export interface User {
  name: string | null;
  createdAt: Date;
  profilePicture: string | null;
  emojisStyle: EmojiStyle;
  tasks: Task[];
  categories: Category[];
  colorList: string[];
  settings: AppSettings;
  theme: "system" | (string & {});
  darkmode: DarkModeOptions;
  refetchData: number;
}

/**
 * Represents a task in the application.
 */
export interface Task {
  id: UUID;
  done: boolean;
  pinned: boolean;
  name: string;
  description?: string;
  emoji?: string;
  color: string;
  date: Date;
  deadline: Date;
  category?: Category[];
  lastSave?: Date;
  sharedBy?: string;
  sentiment?: string;
  confidence?: number;
}

/**
 * Represents a category in the application.
 */
export interface Category {
  id: UUID;
  name: string;
  emoji?: string;
  color: string;
}

/**
 * Represents application settings for the user.
 */
export interface AppSettings {
  enableCategories: boolean;
  doneToBottom: boolean;
  enableGlow: boolean;
  simpleEmojiPicker: boolean;
  enableReadAloud: boolean;
  appBadge: boolean;
  voice: string;
  voiceVolume: number;
}
