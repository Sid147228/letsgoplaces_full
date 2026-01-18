import Skeleton from "@/app/components/ui/Skeleton";

export default function LoadingTripDetail() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Skeleton className="h-10 w-64 mb-4" />

      <div className="space-y-2 mb-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>

      <Skeleton className="h-6 w-40 mb-4" />

      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-white/10 rounded-xl p-5 bg-black/40 backdrop-blur"
          >
            <Skeleton className="h-5 w-24 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
