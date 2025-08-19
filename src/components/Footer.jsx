export default function Footer() {
  return (
    <footer
      className="py-6 text-center border-t 
                 bg-white dark:bg-black
                 text-gray-600 dark:text-gray-400 
                 border-gray-200 dark:border-gray-700
                 transition-colors duration-500"
    >
      © {new Date().getFullYear()} Amit Rai One With Nature 🌿
    </footer>
  );
}
