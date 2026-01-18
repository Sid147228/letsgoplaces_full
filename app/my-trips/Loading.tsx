import Skeleton from "@/app/components/ui/Skeleton";

export default function LoadingMyTrips() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <Skeleton className="h-8 w-40 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-white/10 rounded-xl p-5 bg-black/40 backdrop-blur"
          >
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
