import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function POST(
  request: NextRequest,
  { params }: { params: { handle: string } },
) {
  const req = await request.json();

  console.log(
    req,
    ":::body from webhook call for paystack",
    params.handle,
    ":::slug for route",
  );

  const data = {
    success: true,
    message: "Webhook received!",
    data: null,
  };
  return Response.json(data);
}
