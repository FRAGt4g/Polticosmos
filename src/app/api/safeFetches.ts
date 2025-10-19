import type { Bill } from "~/lib/types";

export async function getBills(params: Partial<Bill>): Promise<Bill[]> {
  const queryString = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      queryString.set(key, value.toString());
    }
  }
  const result = await fetch(`/api/bills?${queryString.toString()}`, {
    method: "GET",
  });
  if (!result.ok) {
    console.error(
      `Error getting bills ${JSON.stringify(params)}: ${result.statusText}`,
    );
    return [];
  }
  const data = (await result.json()) as Bill[];
  return data;
}

export async function getAllBills(): Promise<Bill[]> {
  return getBills({ congress: 119 });
}

export async function getBillsFromRep(repId: string): Promise<Bill[]> {
  const result = await fetch(`/api/allcasesfromrep?uid=${repId}`, {
    method: "GET",
  });
  if (!result.ok) {
    console.error(
      `Error getting bills from rep ${repId}: ${result.statusText}`,
    );
    return [];
  }
  return (await result.json()) as Bill[];
}
