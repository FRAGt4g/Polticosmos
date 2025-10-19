import { NextResponse } from "next/server";
import db from "~/app/api/api-utils";
import type { VoteResolution } from "~/lib/types";

export async function GET() {
  const query = "SELECT * FROM votes";
  const client = await db.connect();
  const { rows } = (await client.query(query)) as { rows: VoteResolution[] };
  client.release();

  return NextResponse.json(rows);
}
