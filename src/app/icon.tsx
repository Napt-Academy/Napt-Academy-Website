import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5a6b32",
          borderRadius: "50%",
          color: "#f7f4ec",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
