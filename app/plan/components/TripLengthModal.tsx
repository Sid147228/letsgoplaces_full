"use client";

interface TripLengthModalProps {
  open: boolean;
  onSelect: (days: number) => void;
  onClose: () => void;
}

export default function TripLengthModal({
  open,
  onSelect,
  onClose,
}: TripLengthModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-10 max-w-sm w-full text-center shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">
          How long is your trip?
        </h2>

        <p className="text-sm text-slate-300 mb-8">
          Choose a trip length so we can build your itinerary.
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => onSelect(3)}
            className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl font-bold shadow-lg hover:opacity-90 transition"
          >
            3
          </button>

          <button
            onClick={() => onSelect(5)}
            className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl font-bold shadow-lg hover:opacity-90 transition"
          >
            5
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}