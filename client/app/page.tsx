import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex h-screen justify-center items-center flex-col">
        <h1 className="mb-4 text-6xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-8xl dark:text-white">
          We deliver private parcels
        </h1>
        <p className="mb-6 text-center text-xl mt-4 font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
          with more than 10 bikers ready to go anywhere. we can deliver private
          parcels just on time.
        </p>
        <a
          href="/login"
          className="text-lg inline-flex items-center justify-center px-5 py-3  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          get started
        </a>
      </main>
    </>
  );
}
