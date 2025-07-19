import { sheets_v4 } from "googleapis";

export async function applySheetFormatting(sheets: sheets_v4.Sheets, spreadsheetId: string, sheetTitle: string): Promise<void> {
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheet = meta.data.sheets?.find((s) => s.properties?.title === sheetTitle);

    const sheetId = sheet?.properties?.sheetId;
    if (!sheetId) {
        throw new Error(`Sheet '${sheetTitle}' not found`);
    }

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests: [
                {
                    repeatCell: {
                        range: {
                            sheetId,
                            startRowIndex: 0,
                            startColumnIndex: 0,
                        },
                        cell: {
                            userEnteredFormat: {
                                horizontalAlignment: "LEFT",
                            },
                        },
                        fields: "userEnteredFormat.horizontalAlignment",
                    },
                },
            ],
        },
    });
}
