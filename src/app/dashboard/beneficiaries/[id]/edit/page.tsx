import Form from "@/app/ui/dashboard/beneficiaries/edit-form"
import Breadcrumbs from '@/app/ui/dashboard/expenses/breadcrumbs'
import { fetchBeneficiariesById } from '@/app/lib/data'; 
import { notFound } from 'next/navigation';
import { custom } from 'zod';
import { BeneficiaryForm } from "@/app/lib/definitions";

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;

    const beneficiary = await fetchBeneficiariesById(params.id);

    if(!beneficiary) notFound();
    
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beneficiaries', href: '/dashboard/beneficiaries' },
          {
            label: 'Edit Beneficiary',
            href: `/dashboard/beneficiaries/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form beneficiary={beneficiary}/>
    </main>
  );
}