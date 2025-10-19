import type { Bill, Rep, VoteResolution } from "~/lib/types";

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

export async function getMoreThanIntroduced(): Promise<Bill[]> {
  const result = await fetch(`/api/morethanintroduced`, {
    method: "GET",
  });
  if (!result.ok) {
    console.error(`Error getting more than introduced: ${result.statusText}`);
    return [];
  }
  const data = (await result.json()) as Bill[];
  return data;
}

export async function getAllBills(): Promise<Bill[]> {
  console.log("Getting all bills");
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

export async function getAllReps(): Promise<Rep[]> {
  console.log("Getting all reps");
  const result = await fetch(`/api/allreps`, {
    method: "GET",
  });
  if (!result.ok) {
    console.error(`Error getting all reps: ${result.statusText}`);
    return [];
  }
  return (await result.json()) as Rep[];
}

export async function getAllVotes(): Promise<VoteResolution[]> {
  console.log("Getting all votes");
  const result = await fetch(`/api/votes`, {
    method: "GET",
  });
  if (!result.ok) {
    console.error(`Error getting all votes: ${result.statusText}`);
    return [];
  }
  return (await result.json()) as VoteResolution[];
}
