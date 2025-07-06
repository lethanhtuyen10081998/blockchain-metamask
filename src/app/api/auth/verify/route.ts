import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "ethers";
import { userService } from "@/lib/supabase/services/userService";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { address, signature, message } = body;

  try {
    const recovered = verifyMessage(message, signature);

    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json(
        { error: "Signature mismatch" },
        { status: 401 }
      );
    }

    const user = await userService.findOrCreate(address);

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
