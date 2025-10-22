import { z } from "zod";

export const SearchSchema = z.object({
  q: z.string().min(1),
});

export type SearchSchema = z.infer<typeof SearchSchema>;
