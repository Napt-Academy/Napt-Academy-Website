import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { getTrainingCenters } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }

    const centers = await getTrainingCenters();
    const center = centers.find((item) => item.id === parsed.data.center);
    if (!center) {
      return NextResponse.json({ ok: false, error: "Please choose a valid centre" }, { status: 400 });
    }

    // Structured payload for a future email/CRM integration.
    const enquiry = {
      ...parsed.data,
      centerName: center.name,
      receivedAt: new Date().toISOString(),
    };
    console.info("[contact-enquiry]", enquiry);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process this enquiry" }, { status: 500 });
  }
}
