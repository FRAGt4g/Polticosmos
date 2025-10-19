import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "~/app/api/api-utils";

export async function GET(request: NextRequest) {
  const id = 1;

  const client = await db.connect();
  const { rows } = await client.query("SELECT * FROM bills WHERE uid = $1", [
    id,
  ]);
  client.release();

  return NextResponse.json(rows);
}
