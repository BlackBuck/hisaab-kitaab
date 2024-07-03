'use client';
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../../button";
import { Beneficiary } from "@/app/lib/definitions";
import { fetchBeneficiaries } from "@/app/lib/data";
import { useFormState } from "react-dom";
import { CreateBeneficiary } from "./buttons";
import { useActionState } from "react";
import { createBeneficiary } from "@/app/lib/actions";

export function Form() {

    // const initialState: State = {message: "", errors: {}}
    // const [state, formAction] = useFormState(createExpense, initialState);
    
    return (
      <form action={createBeneficiary}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">

          {/* Invoice Amount */}
          <div className="mb-4">
            <label htmlFor="beneficiary_name" className="mb-2 block text-sm font-medium">
              Edit Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/beneficiaries"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Beneficiary</Button>
        </div>
      </form>
    );
}