import EventDetails from "@/app/components/EventDetails";

const EventDetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return <EventDetails params={params} />;
};

export default EventDetailsPage;
