import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  kamai: BanknotesIcon,
  kharcha: UserGroupIcon,
  udhari: ClockIcon,
  bakaya: InboxIcon,
};

export default async function CardWrapper() {
  
  const {
    kamaiCounts,
    kharchaCounts,
    bakayaCounts,
    udharCounts
  } = await fetchCardData();


  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card value={kamaiCounts} type="kamai" />
      <Card value={kharchaCounts} type="kharcha" />
      <Card value={udharCounts} type="udhari" />
      <Card
        value={bakayaCounts}
        type="bakaya"
      />
    </>
  );
}

export function Card({
  value,
  type,
}: {
  value: number | string;
  type: 'kamai' | 'kharcha' | 'udhari' | 'bakaya';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm m-1">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{type}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
