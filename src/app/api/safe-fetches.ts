import { type Bill } from "~/lib/types";
import { createDummyBillInfoSeeded } from "~/lib/utils";

export async function getBill(id: string): Promise<Bill | null> {
  return createDummyBillInfoSeeded(Number(id));
  // try {
  //   const res = await fetch(`/api/bills/${id}`);
  //   return (await res.json()) as Bill;
  // } catch (error) {
  //   console.error("Error getting bill: ", error);
  //   return null;
  // }
}

export async function getBillsFromSenator(senatorId: string): Promise<Bill[]> {
  return Array.from(
    { length: Math.floor(Math.random() * 10) + 1 },
    (_, index) => createDummyBillInfoSeeded(Number(senatorId + index * 1000)),
  );

  // try {
  //   const res = await fetch(`/api/senator/${senatorId}`);
  //   return (await res.json()) as Bill[];
  // } catch (error) {
  //   console.error("Error getting bills from senator: ", error);
  //   return [];
  // }
}
