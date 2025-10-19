import { type NextRequest, NextResponse } from "next/server";
import db from "~/app/api/api-utils";
import type { Bill } from "~/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const values: unknown[] = [];

  if (searchParams.size === 0) {
    return NextResponse.json(
      { error: "No search parameters provided" },
      { status: 400 },
    );
  }

  let query = "SELECT * FROM bills WHERE";
  let count = 1;
  for (const [key, value] of searchParams.entries()) {
    query += ` ${key} = $${count} AND`;
    values.push(value);
    count++;
  }
  query = query.slice(0, -4); // remove the last "AND"

  const client = await db.connect();
  const { rows } = (await client.query(query, values)) as { rows: Bill[] };
  client.release();

  return NextResponse.json(rows);
}
