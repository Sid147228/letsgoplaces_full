export default function ItineraryDay({ day, morning, afternoon, evening }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-xs text-slate-400 uppercase mb-2">Day {day}</p>

      <div className="space-y-2 text-sm text-slate-300">
        <p>
          <span className="text-slate-400">Morning:</span> {morning}
        </p>
        <p>
          <span className="text-slate-400">Afternoon:</span> {afternoon}
        </p>
        <p>
          <span className="text-slate-400">Evening:</span> {evening}
        </p>
      </div>
    </div>
  );
}