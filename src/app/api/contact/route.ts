import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { getTrainingCenters } from "@/lib/content";
import { insertEnquiry } from "@/lib/db/queries";

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

    const enquiry = {
      name: parsed.data.name,
      centerId: parsed.data.center,
      centerName: center.name,
      subject: parsed.data.subject,
      message: parsed.data.message,
    };

    await insertEnquiry(enquiry);
    console.info("[contact-enquiry]", { ...enquiry, receivedAt: new Date().toISOString() });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process this enquiry" }, { status: 500 });
  }
}
