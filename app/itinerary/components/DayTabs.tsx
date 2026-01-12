export default function DayTabs({ days, activeDay, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-4 mb-6 no-scrollbar">
      {Array.from({ length: days }).map((_, i) => {
        const d = i + 1;
        const selected = d === activeDay;

        return (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              selected
                ? "bg-white text-black border-white"
                : "border-white/20 text-slate-300 hover:border-white/40"
            }`}
          >
            Day {d}
          </button>
        );
      })}
    </div>
  );
}