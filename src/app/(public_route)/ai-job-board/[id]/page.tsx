import SingleJob from "@/components/deo/SingleJob";

export default function ViewJobPage({ params }: { params: { id: string } }) {
  return <SingleJob singleJobId={params.id}/>;
}
