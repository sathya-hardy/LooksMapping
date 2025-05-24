import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="w-full bg-white shadow dark:bg-gray-800 px-6 py-4 mb-4 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-200 mx-auto">
        Looks Mapping
      </h1>
      <DarkModeToggle />
    </header>
  );
}