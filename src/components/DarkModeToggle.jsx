export default function DarkModeToggle() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className="top-2 right-2 z-50 px-4 py-1 text-sm rounded bg-gray-200 dark:bg-gray-800 dark:text-white shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      Toggle Dark Mode
    </button>
  );
}