import { NextResponse } from "next/server";
import db from "~/app/api/api-utils";
import type { Rep } from "~/lib/types";

export async function GET() {
  const query = "SELECT * FROM reps";
  const client = await db.connect();
  const { rows } = (await client.query(query)) as { rows: Rep[] };
  client.release();

  return NextResponse.json(rows);
}
