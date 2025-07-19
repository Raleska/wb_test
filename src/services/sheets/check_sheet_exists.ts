import { sheets_v4 } from "googleapis";

export async function checkSheetExists(sheets: sheets_v4.Sheets, spreadsheetId: string, sheetTitle: string): Promise<void> {
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const titles = sheetMeta.data.sheets?.map((s) => s.properties?.title) || [];

    if (!titles.includes(sheetTitle)) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [
                    {
                        addSheet: {
                            properties: { title: sheetTitle },
                        },
                    },
                ],
            },
        });
    }
}
