import { ArrowPathIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestExpense } from '@/app/lib/definitions';
import { fetchLatestExpenses } from '@/app/lib/data';


export default async function LatestExpenses() {
  const latestExpenses : LatestExpense[] = await fetchLatestExpenses();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestExpenses.map((expense, i) => {
            return (
              <div
                key={expense.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {expense.name}
                    </p>
                    <p className="truncate text-sm text-gray-400 md:text-base">
                      {expense.date}
                    </p>
                  </div>
                </div>
                <div className='min-w-6 flex flex-row items-center min-h-6 mx-2'>
                  <CurrencyRupeeIcon />
                  <p
                    className={`${lusitana.className} text-md font-medium md:text-base`}
                  >
                    {expense.amount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
