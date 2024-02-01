import Link from "next/link";

interface Props {
  title?: string;
  secondTitle?: string;
}
const PageHeader: React.FC<Props> = ({ title, secondTitle }) => {
  return (
    <section className="pb-10 bg-[url('/assets/images/shapes/stripe-light.svg')] bg-no-repeat dark:bg-[url('/assets/images/shapes/stripe-dark.svg')] flex  justify-center items-center  bg-cover bg-start pt-40 lg:pb-14">
      <div className="flex flex-col gap-6 pb-6">
        <h1 className="h3-t">{title}</h1>
        <nav>
          <ol className="flex justify-center gap-4 text-sm">
            <li>
              <Link
                href="/"
                className="no-underline text-sm dark:text-gray-400 dark:hover:text-[#6a4dff] text-[#000]"
              >
                Home
              </Link>
            </li>
            <li className="dark:text-gray-400 text-sm text-[#000]">
              <span className="mr-3">/</span>
              {secondTitle ? secondTitle : title}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};
export default PageHeader;
