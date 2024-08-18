import { load } from "ts-dotenv";

export const envs = load({
  PORT: Number,
  APP_NAME: String,
  GDRIVE_CLIENT_ID: String,
  GDRIVE_CLIENT_SECRET: String,
  GDRIVE_REDIRECT_URI: String,
  GDRIVE_REFRESH_TOKEN: String,
  GDRIVE_FOLDER_ID: String,
});
