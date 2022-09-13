export default function Footer() {
  return (
    <footer>
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-7xl items-center mx-auto">
        <div className="space-y-2 md:space-y-0 flex py-6 text-sm text-neutral-400 justify-center">
          <span className="">
            {"</>"} with 💗 by{" "}
            <a
              className=" text-gray-300 dark:hover:text-gray-600"
              href="https://nierdod.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rivon
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
