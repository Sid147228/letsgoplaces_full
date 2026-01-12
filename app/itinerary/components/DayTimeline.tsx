import ActivityCard from "./ActivityCard";

interface ActivityBlock {
  title: string;
  desc: string;
  img: string;
}

interface DayTimelineProps {
  data: {
    day: number;
    morning: ActivityBlock;
    afternoon: ActivityBlock;
    evening: ActivityBlock;
  };
}

export default function DayTimeline({ data }: DayTimelineProps) {
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