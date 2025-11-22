import { z } from "@/utils";

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;