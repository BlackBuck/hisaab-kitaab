import {Form} from "@/app/ui/dashboard/beneficiaries/create-form";
import Breadcrumbs from "@/app/ui/dashboard/expenses/breadcrumbs";
import { fetchBeneficiaries } from "@/app/lib/data";


export default async function Page() {
    const beneficiaries = await fetchBeneficiaries();
    return(
        <main>
            <Breadcrumbs
        breadcrumbs={[
          { label: 'Beneficiaries', href: '/dashboard/beneficiaries' },
          {
            label: 'Create Beneficiary',
            href: '/dashboard/beneficiaries/create',
            active: true,
          },
        ]}
      />

        <Form />
        </main>
    )
}