import Image from "next/image";

interface ActivityCardProps {
  time: string;
  title: string;
  desc: string;
  img: string;
}

export default function ActivityCard({
  time,
  title,
  desc,
  img,
}: ActivityCardProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-24 h-24 relative rounded-xl overflow-hidden border border-white/10">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
          {time}
        </p>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-slate-300">{desc}</p>
      </div>
    </div>
  );
}