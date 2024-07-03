import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@tremor/react";
import Link from "next/link";
import { deleteBeneficiary } from "@/app/lib/actions";
export function CreateBeneficiary() {
    return (
        <Link
      href="/dashboard/beneficiaries/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Beneficiary</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
    )
}

export function UpdateBeneficiary({id}: {id: string}) {
    return (
        <Link
        href={`/dashboard/beneficiaries/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    )
}

export function DeleteBeneficiary({id} : {id: string}) {
    const DeleteBeneficiaryWithId = deleteBeneficiary.bind(null, id);
 
  return (
    <form action={DeleteBeneficiaryWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}