import SingleJob from "@/components/deo/SingleJob";

export default function ViewJobPage({ params }: { params: { id: string } }) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Job Details</h1>
      <SingleJob singleJobId={params.id} employer={true} />
    </>
  );
}
