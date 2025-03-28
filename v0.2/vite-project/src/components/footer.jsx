import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-800 shadow-md p-4 text-center text-gray-200">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center text-center md:flex-row md:justify-between">
            <span className="text-sm text-gray-200 sm:text-center">
             © {new Date().getFullYear()}{" "}
            CollecKeytion. Tous droits réservés.
            </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 sm:mt-0 text-center">
          <li>
            <Link to="/about" className="hover:underline me-4 md:me-6">
              À propos
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">
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
