import Link from "next/link";

export default function ViewJobPage() {
  return (
    <>
      <div className="flex  items-center justify-center py-40 ">
        <h1 className="text-gray-100 font-extrabold text-4xl">
          FIND YOUR NEXT CAREER GIG
        </h1>
      </div>
      <div className="flex flex-col gap-4 mx-20 rounded-md shadow-md text-gray-100 bg-black mt-[-100px] mb-10 p-10">
        <h2 className="text-gray-100 font-extrabold text-2xl">
          SALESFORCE MARKETING AUTOMATION CONSULTANT
        </h2>
        <div className="flex border-b-[1px] border-white pb-4">
          <div className="flex items-center gap-10 text-lg ">
            <span>
              Employer : <span className="font-medium"> CloudMasonry</span>{" "}
            </span>
            <span>
              Date Posted : <span className="font-medium"> 12-4-2022</span>
            </span>
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              : <span className="font-medium"> New York</span>
            </span>
          </div>
          <div className="flex ml-auto ">
            <Link
              href="#"
              className=" text-base rounded-md px-4 py-2 !text-gray-950 hover:!text-gray-100 bg-white hover:bg-transparent"
            >
              Apply now
            </Link>
          </div>
        </div>
        <div className="content text-gray-100">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
          ipsum eos. Aliquam adipisci nulla nihil laudantium, numquam dolorem,
          voluptates, pariatur earum excepturi quas reiciendis. Saepe ut magnam
          aperiam rem reiciendis. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Vitae omnis eligendi necessitatibus mollitia,
          nesciunt corporis? Ex veritatis vero voluptas architecto labore,
          corrupti consectetur est et. Neque provident officiis illo rerum!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur hic
          magni nulla laudantium voluptatum? Fugiat fuga unde voluptatum, ipsa
          esse atque, aspernatur delectus doloremque magnam laboriosam iusto
          omnis asperiores. Maiores. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ab, illo praesentium reprehenderit voluptate
          distinctio similique esse itaque veritatis, consequuntur accusamus
          veniam natus labore quo atque repellendus! A, expedita eveniet! Ullam!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti vero
          autem neque iste veniam nihil necessitatibus, numquam exercitationem
          voluptate eaque voluptates ex et optio qui ea velit dicta? Nihil,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Iste perferendis ea esse minima ducimus provident ut dolor
          necessitatibus odit, consequuntur praesentium repellat voluptate,
          maxime dolores cum consectetur illo rem sint? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eligendi velit ipsa dolor ab
          facilis! Sunt sint cumque fugit voluptatum sapiente, expedita ullam
          nostrum amet vel ad aut quam libero voluptate. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eveniet sequi reprehenderit,
          nesciunt debitis, ipsa a maiores esse natus atque accusamus libero
          delectus, cum dolores. Saepe, dolorum. Excepturi laudantium omnis
          dignissimos.
        </div>
        <div className="my-8 ">
          <Link
            href="#"
            className=" text-base rounded-md px-4 py-2 !text-gray-950 hover:!text-gray-100 bg-white hover:bg-transparent"
          >
            Apply now
          </Link>
        </div>
      </div>
    </>
  );
}
