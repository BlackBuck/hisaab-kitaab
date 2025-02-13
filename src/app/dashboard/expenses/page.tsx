import Search from '@/app/ui/Search';
import Table from '@/app/ui/dashboard/expenses/table';
import { CreateExpense } from '@/app/ui/dashboard/expenses/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ExpensesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
// import { fetchInvoicesPages } from '@/app/lib/data'; 

export default async function Page({
    searchParams
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Expenses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search expenses..." title={''} />
        <CreateExpense />
      </div>
       <Suspense key={query + currentPage} fallback={<ExpensesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}