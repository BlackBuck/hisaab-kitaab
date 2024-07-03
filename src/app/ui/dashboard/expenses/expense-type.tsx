import { CurrencyRupeeIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

export default function ExpenseType({type}: {type: string}) {
    return (
        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-gray-300 text-white">
            <>
                {type}
                <CurrencyRupeeIcon />
            </>
        </span>
    )
}