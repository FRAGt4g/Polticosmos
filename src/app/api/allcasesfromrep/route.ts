import { type NextRequest, NextResponse } from "next/server";
import db from "~/app/api/api-utils";
import type { Bill } from "~/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const repUid = searchParams.get("uid");

  if (!repUid) {
    return NextResponse.json(
      { error: "No search parameters provided" },
      { status: 400 },
    );
  }

  const query = `SELECT * FROM bills WHERE $1 = ANY(sponsors);`;
  const client = await db.connect();
  const { rows } = (await client.query(query, [repUid])) as { rows: Bill[] };
  client.release();

  return NextResponse.json(rows);
}
