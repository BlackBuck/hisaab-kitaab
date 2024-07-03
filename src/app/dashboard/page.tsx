import { Suspense } from "react"
import { CardSkeleton, PaymentsChartSkeleton, ExpenseSkeleton, LatestPaymentsSkeleton } from "@/app/ui/skeletons"
import CardWrapper from "@/app/ui/dashboard/cards";
import { inter } from "../ui/fonts";
import PaymentsChart from "@/app/ui/dashboard/charts";
import LatestExpenses from "../ui/dashboard/latest-expenses";


export default function Page() {
    return (
      <main>
        <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="w-full h-fullgrid grid gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <Suspense fallback={<CardSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<PaymentsChartSkeleton />}>
            <PaymentsChart />
          </Suspense>
          <Suspense fallback={<LatestPaymentsSkeleton />}>
            <LatestExpenses />
          </Suspense>
        </div>
      </main>
    );
}