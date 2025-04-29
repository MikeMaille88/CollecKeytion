import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-800 shadow-md p-2 text-center text-gray-200">
      <div className="w-full mx-auto max-w-screen-xl p-2 flex flex-col items-center text-center gap-2 md:flex-row md:justify-between">
        <span className="text-xs sm:text-sm text-gray-200">
          © {new Date().getFullYear()} CollecKeytion. Tous droits réservés.
        </span>
        <ul className="flex flex-wrap items-center text-xs sm:text-sm font-medium text-gray-200">
          <li>
            <Link to="/about" className="hover:underline me-3 md:me-5">
              À propos
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:underline me-3 md:me-5">
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}


