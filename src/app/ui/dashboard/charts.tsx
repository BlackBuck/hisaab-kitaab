'use client';
import { BarChart } from "@tremor/react";
import { fetchMonthlyExpenses } from "@/app/lib/data";
import type { MonthlyExpense } from "@/app/lib/definitions";
import { customTooltipTypeBar } from "@/app/lib/definitions";
import customTooltip from "./custom-tooltip";

export default async function PaymentsChart() {

    const data: MonthlyExpense[] = await fetchMonthlyExpenses();
    return (
        <>
        <h3>Monthly Expenses Chart</h3>
        <BarChart
            className="mt-6 w-full"
            data={data}
            index="month"
            categories={['expenses']}
            colors={['blue']}
            yAxisWidth={48}
            customTooltip={customTooltip}
        />
        </>
    )
}