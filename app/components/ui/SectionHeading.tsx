export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-gray-600 mt-3">{subtitle}</p>
    </div>
  );
}
