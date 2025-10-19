import { type NextRequest, NextResponse } from "next/server";
import db from "~/app/api/api-utils";
import type { Bill } from "~/lib/types";

export async function GET(request: NextRequest) {
  const query = "SELECT * FROM bills WHERE states != '{introduced}'";
  const client = await db.connect();
  const { rows } = (await client.query(query)) as { rows: Bill[] };
  client.release();

  return NextResponse.json(rows);
}
