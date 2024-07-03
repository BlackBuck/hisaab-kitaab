'use client';

import type { NameField, ExpenseForm, Expense } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateExpense } from '@/app/lib/actions';
import { State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useFormState } from 'react-dom';

export default function Form({
  expense,
  beneficiaries,
}: {
  expense: Expense;
  beneficiaries: NameField[];
}) {

  const initialState: State = {message: "", errors: {}};
  const updateExpenseWithId = updateExpense.bind(null, expense.id);
  const [state, formAction] = useFormState(updateExpenseWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="beneficiary" className="mb-2 block text-sm font-medium">
            Choose Beneficiary
          </label>
          <div className="relative">
            <select
              id="beneficiary"
              name="beneficiaryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={expense.id}
            >
              <option value="" disabled>
                Select a beneficiary
              </option>
              {beneficiaries.map((beneficiary) => (
                <option key={beneficiary.id} value={beneficiary.id}>
                  {beneficiary.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.5"
                defaultValue={expense.amount}
                placeholder="Enter INR amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the expense type
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="udhar"
                  name="type"
                  type="radio"
                  value="udhar"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="udhar"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray"
                >
                  Udhar <CurrencyRupeeIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="kharcha"
                  name="type"
                  type="radio"
                  value="kharcha"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="kharcha"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray"
                >
                  Kharcha <CurrencyRupeeIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="bakaya"
                  name="type"
                  type="radio"
                  value="bakaya"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="bakaya"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray"
                >
                  Bakaya <CurrencyRupeeIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="kamai"
                  name="type"
                  type="radio"
                  value="kamai"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="kamai"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray"
                >
                  Kamai <CurrencyRupeeIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/expenses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Expense</Button>
      </div>
    </form>
  );
}
