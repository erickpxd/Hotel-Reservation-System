import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "The name must have at least 3 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "The password must have at least 6 characters"),
  })

export type RegisterData = z.infer<typeof registerSchema>;