export default function BlogsDetails({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="container">
        <div className=" pt-40">
          <h1>Blog Details</h1>
          <h4>Name: {params.slug}</h4>
        </div>
      </div>
    </>
  );
}
