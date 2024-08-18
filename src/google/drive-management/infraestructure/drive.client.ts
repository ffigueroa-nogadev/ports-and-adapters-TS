import { google } from "googleapis";
import { envs } from "../../../envs";

const {
  GDRIVE_CLIENT_ID,
  GDRIVE_CLIENT_SECRET,
  GDRIVE_REDIRECT_URI,
  GDRIVE_REFRESH_TOKEN,
} = envs;

const oAuth2Client = new google.auth.OAuth2(
  GDRIVE_CLIENT_ID,
  GDRIVE_CLIENT_SECRET,
  GDRIVE_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: GDRIVE_REFRESH_TOKEN });

export const driveClient = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

