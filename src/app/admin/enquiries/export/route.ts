import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listEnquiries } from "@/lib/db/queries";

export const runtime = "nodejs";

function csvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

export async function GET() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await listEnquiries();
  const header = ["Name", "Center", "Subject", "Message", "Date"];
  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [
        csvCell(row.name),
        csvCell(row.centerName || row.centerId),
        csvCell(row.subject),
        csvCell(row.message),
        csvCell(formatDate(row.createdAt)),
      ].join(","),
    ),
  ];

  const body = `\uFEFF${lines.join("\r\n")}\r\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="enquiries.csv"',
      "Cache-Control": "no-store",
    },
  });
}
