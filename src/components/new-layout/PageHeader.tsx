import Link from "next/link";

interface Props {
  title?: string;
  secondTitle?: string;
}
const PageHeader: React.FC<Props> = ({ title, secondTitle }) => {
  return (
    <section
      className="pb-10 pb-lg-15 bg-striped pt-40"
      data-aos="fade-up-sm"
      data-aos-delay="50"
    >
      <div className="container">
        <div className="text-center">
          <h3 className="theme-text-2 mb-2">{title}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-center fs-sm">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {secondTitle ? secondTitle : title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default PageHeader;
