import Form from '@/app/ui/dashboard/expenses/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/expenses/breadcrumbs'
import { fetchExpenseById, fetchBeneficiaries } from '@/app/lib/data'; 
import { notFound } from 'next/navigation';
import { custom } from 'zod';

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;

    const [expense, customers] = await Promise.all([
        fetchExpenseById(id),
        fetchBeneficiaries(),
    ]);

    if(!expense) notFound();
    
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Edit Expense',
            href: `/dashboard/expenses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form expense={expense} beneficiaries={customers} />
    </main>
  );
}