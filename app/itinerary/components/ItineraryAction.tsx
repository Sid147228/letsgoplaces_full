import {
  BookmarkIcon,
  ShareIcon,
  MapIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function ItineraryActions() {
  return (
    <div className="flex gap-3 justify-end py-6">
      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:border-white/40 transition">
        <BookmarkIcon className="w-4 h-4" />
        Save
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:border-white/40 transition">
        <ShareIcon className="w-4 h-4" />
        Share
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:border-white/40 transition">
        <ArrowDownTrayIcon className="w-4 h-4" />
        Export
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:border-white/40 transition">
        <MapIcon className="w-4 h-4" />
        Map
      </button>
    </div>
  );
}