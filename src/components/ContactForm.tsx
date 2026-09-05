"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactForm({
  heading,
  body,
  centers,
}: {
  heading: string;
  body: string;
  centers: { id: string; name: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", center: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setServerMessage(payload.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setServerMessage("Thank you. A coordinator will contact you with batch details.");
      reset();
    } catch {
      setStatus("error");
      setServerMessage("Unable to send your enquiry. Please try again or call us.");
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-10">
      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{heading}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{body}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="center">Choose Center</Label>
          <Controller
            name="center"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} {...(field.value ? { value: field.value } : {})}>
                <SelectTrigger id="center" aria-invalid={!!errors.center}>
                  <SelectValue placeholder="Select a training centre" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map((center) => (
                    <SelectItem key={center.id} value={center.id}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.center ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.center.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject")} aria-invalid={!!errors.subject} />
          {errors.subject ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.subject.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your message</Label>
          <Textarea
            id="message"
            rows={6}
            {...register("message")}
            aria-invalid={!!errors.message}
            className="min-h-32"
          />
          {errors.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        {status === "success" ? (
          <p className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground" role="status">
            {serverMessage}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-destructive" role="alert">
            {serverMessage}
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={isSubmitting} className="bg-gold text-ink hover:bg-gold-soft">
          {isSubmitting ? "Submitting…" : "Submit"}
        </Button>
      </form>
    </div>
  );
}
