import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  center: z.string().trim().min(1, "Please choose a centre"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
