import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
const getUserDeatils = async () => {
  const userData = await fetch("http://localhost:3001/api/users");
  const resp = await userData.json();
  if (resp.success) {
    return resp.result;
  } else {
    success: false;
  }
};
export default async function Page() {
  const users = await getUserDeatils();
  //   console.log(users);
  return (
    <>
      <div className="container pt-40">
        <div className="my-5 ml-10">
          <Link
            href="/admin"
            className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
          >
            {leftArrowIcon}
            Dashboard
          </Link>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <div className="pb-4  dark:bg-gray-900 pt-10">
            <div className="relative mt-1 ml-auto pl-5 pb-3">
              {/* <div className="absolute inset-y-0 left-0 flex items-center ml-auto pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div> */}
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search htmlFor items"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  User ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  User Email
                </th>
                <th scope="col" className="px-6 py-3">
                  User Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  User Country
                </th>
                <th scope="col" className="px-6 py-3">
                  User City State
                </th>
                <th scope="col" className="px-6 py-3">
                  User Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item: any) => {
                return (
                  <>
                    <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      {/* <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item._id}
                      </th> */}
                      <td className="px-6 py-4">
                        {item.firstName + " " + item.lastName}
                      </td>
                      <td className="px-6 py-4"> {item.email} </td>
                      <td className="px-6 py-4">{item?.phone}</td>
                      <td className="px-6 py-4">{item.contact?.country}</td>
                      <td className="px-6 py-4"> {item.contact?.cityState} </td>
                      <td className="px-6 py-4">{item.role}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Active
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
