export default function Search({ isSearch, onChange }) {
  return (
    <div className="m-auto w-full md:w-3/5">
      <div className="mx-2 flex flex-grow justify-start border-b p-2">
        <svg
          width="24"
          height="24"
          fill="none"
          className="mr-2 text-green-600 transition-colors duration-200 group-hover:text-gray-500 dark:text-white"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="search"
          role="search"
          onChange={onChange}
          placeholder="Enter your city"
          className="mx-3 w-full placeholder-gray-500 outline-none bg-gray-800 text-white"
        />
        {isSearch ? (
          <svg
            className="mt-1 -ml-1 h-5 w-5 animate-spin text-gray-500 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>Search for a location</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              role="progressbar"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
      </div>
    </div>
  );
}
