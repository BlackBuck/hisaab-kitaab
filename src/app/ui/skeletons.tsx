const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function PaymentSkeleton() {
    return (
      <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
          <div className="min-w-0">
            <div className="h-5 w-40 rounded-md bg-gray-200" />
            <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
      </div>
    );
}

export function LatestPaymentsSkeleton() {
    return (
      <div
        className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
      >
        <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
          <div className="bg-white px-6">
            <PaymentSkeleton />
            <PaymentSkeleton />
            <PaymentSkeleton />
            <PaymentSkeleton />
            <PaymentSkeleton />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    );
}


export function PaymentsChartSkeleton() {
    return (
      <>
        <div
          className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}
        >
          <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
          <div className="rounded-xl bg-gray-100 p-4">
            <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
            <div className="flex items-center pb-2 pt-6">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </>
    );
}

export function ExpenseSkeleton() {
  return (
    <div className="border border-gray-100 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-400 rounded col-span-2"></div>
              <div className="h-2 bg-gray-400 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function DashboardSkeleton() {
    return (
        <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </>
    )
}

export function TableRowSkeleton() {
    return (
      <tr className={`${shimmer} w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}>
        {/* Customer Name and Image */}
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-24 rounded bg-gray-100"></div>
          </div>
        </td>
        {/* Email */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Amount */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Date */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Status */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          </div>
        </td>
      </tr>
    );
  }
  
  export function ExpensesMobileSkeleton() {
    return (
      <div className={`${shimmer} mb-2 w-full rounded-md bg-white p-4`}>
        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
          </div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="flex w-full items-center justify-between pt-4">
          <div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
            <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="h-10 w-10 rounded bg-gray-100"></div>
            <div className="h-10 w-10 rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    );
  }
  
  export function ExpensesTableSkeleton() {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              <ExpensesMobileSkeleton />
              <ExpensesMobileSkeleton />
              <ExpensesMobileSkeleton />
              <ExpensesMobileSkeleton />
              <ExpensesMobileSkeleton />
              <ExpensesMobileSkeleton />
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }