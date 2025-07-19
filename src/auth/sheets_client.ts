import { google } from "googleapis";
import { readFile } from "fs/promises";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export async function getSheetsClient() {
    const credentialsPath = path.resolve("src/config/credentials/google.json");
    const content = await readFile(credentialsPath, "utf-8");
    const credentials = JSON.parse(content);

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });

    return google.sheets({ version: "v4", auth });
}
