import ActivityCard from "./ActivityCard";

export default function DayTimeline({ data }) {
  return (
    <div className="space-y-10">
      <ActivityCard
        time="Morning"
        title={data.morning.title}
        desc={data.morning.desc}
        img={data.morning.img}
      />

      <ActivityCard
        time="Afternoon"
        title={data.afternoon.title}
        desc={data.afternoon.desc}
        img={data.afternoon.img}
      />

      <ActivityCard
        time="Evening"
        title={data.evening.title}
        desc={data.evening.desc}
        img={data.evening.img}
      />
    </div>
  );
}