import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const body = (await request.json()) as { billId: string };
    const { billId } = body;

    return NextResponse.json({ message: "Hello from the API!", billId });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting bill", error },
      { status: 500 },
    );
  }
}

// export async function GET(request: NextRequest) {
//   const body = (await request.json()) as { billId: string };
//   const { billId } = body;

//   console.log("GET request received");
//   const connection = new Pool({
//     host: "10.155.210.80",
//     port: 5432,
//     user: "postgres",
//     password: "dev",
//     database: "postgres",
//   });

//   console.log("Connecting to database");
//   const client = await connection.connect();

//   console.log("Querying database");
//   const { rows } = await client.query("SELECT * FROM bills WHERE id = $1", [
//     billId,
//   ]);

//   console.log("Releasing client");
//   client.release();

//   console.log("Returning response");
//   return NextResponse.json(rows);
// }
