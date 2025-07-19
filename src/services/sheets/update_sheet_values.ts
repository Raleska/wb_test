import { sheets_v4 } from "googleapis";

export async function updateSheetValues(sheets: sheets_v4.Sheets, spreadsheetId: string, sheetTitle: string, values: any[][]): Promise<void> {
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetTitle}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
    });
}
