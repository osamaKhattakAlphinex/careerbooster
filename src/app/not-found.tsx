import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#030712]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-gradient-to-r hover:from-purple-800 hover:to-pink-600  from-purple-700 cursor-pointer  to-pink-500 text-white px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <span className="relative inline-block text-sm font-medium group focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-purple-700 group-hover:translate-y-0 group-hover:translate-x-0 rounded-md"></span>

            <span className="relative block px-8 py-3 bg-gradient-to-r hover:from-purple-800 hover:to-pink-600  from-purple-700 cursor-pointer  to-pink-500 text-white shadow-md font-semibold rounded-md">
              <Link href="/">Go Home</Link>
            </span>
          </span>
        </button>
      </main>
    </>
  );
}
