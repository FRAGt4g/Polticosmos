import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import type { BillReference, ExtraBillInformation } from "~/lib/types";

export async function GET() {
  const base = path.join(process.cwd(), "bill-data");
  const categories: Record<BillReference, ExtraBillInformation> = {};
  const tags = new Set<string>();
  const folders = fs.readdirSync(base);

  for (const folder of folders) {
    for (const file of fs.readdirSync(path.join(base, folder))) {
      const bill = path.join(base, folder, file);
      const data = fs.readFileSync(bill, "utf8");
      const billData = JSON.parse(data) as ExtraBillInformation;
      const category = billData.tags;
      for (const tag of category) {
        tags.add(tag);
      }

      categories[file.replace(".json", "")] = billData;
    }
  }

  console.log(tags);
  return NextResponse.json(categories);
}
