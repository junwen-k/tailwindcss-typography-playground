import { z } from "zod"

export const schema = z.object({
  content: z.string().catch(""),
})
