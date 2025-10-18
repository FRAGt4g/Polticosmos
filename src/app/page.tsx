import BarVisualizer from "~/components/BarVisualizer";
import { VStack } from "~/components/helpers/helperdivs";
import type { VoterPercentageBar } from "~/lib/types";

const bar: VoterPercentageBar = {
  yays: {
    republican: 300,
    democrat: 0,
    independent: 0,
  },
  nays: {
    republican: 10,
    democrat: 200,
    independent: 15,
  },
  other: {
    republican: 1,
    democrat: 2,
    independent: 10,
  },
};

const bar2: VoterPercentageBar = {
  yays: {
    republican: 3,
    democrat: 0,
    independent: 1,
  },
  nays: {
    republican: 1,
    democrat: 2,
    independent: 3,
  },
  other: {
    republican: 1,
    democrat: 2,
    independent: 10,
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#] to-[#15162c] text-white">
      <VStack gap={2} className="w-[1000px]">
        <BarVisualizer height={20} bar={bar} />
        <BarVisualizer height={20} bar={bar2} />
      </VStack>
    </main>
  );
}
