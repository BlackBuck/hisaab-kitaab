import {Form} from "@/app/ui/dashboard/expenses/create-form";
import Breadcrumbs from "@/app/ui/dashboard/expenses/breadcrumbs";
import { fetchBeneficiaries } from "@/app/lib/data";


export default async function Page() {
    const beneficiaries = await fetchBeneficiaries();
    return(
        <main>
            <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Create Expense',
            href: '/dashboard/expenses/create',
            active: true,
          },
        ]}
      />

      <Form beneficiaries={beneficiaries}/>
        </main>
    )
}