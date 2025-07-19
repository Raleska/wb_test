import { z } from "zod";

export const TariffBoxItemSchema = z.object({
    warehouseName: z.string(),
    boxDeliveryAndStorageExpr: z.string(),
    boxDeliveryBase: z.string(),
    boxDeliveryLiter: z.string(),
    boxStorageBase: z.string(),
    boxStorageLiter: z.string(),
});

export const TariffBoxResponseSchema = z.object({
    data: z.object({
        dtNextBox: z.string(),
        dtTillMax: z.string(),
        warehouseList: z.array(TariffBoxItemSchema),
    }),
});

export type TariffBoxItem = z.infer<typeof TariffBoxItemSchema>;
