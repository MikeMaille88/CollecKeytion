// passwordValidator.jsx - À créer dans votre dossier components
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const PasswordValidator = ({ password }) => {
  const [checks, setChecks] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setChecks({
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  return (
    <div className="mt-2 text-sm">
      <ul className="space-y-1">
        <li className={`flex items-center ${checks.length ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
          <span className="mr-2">{checks.length ? "✓" : "✗"}</span>
          Au moins 12 caractères
        </li>
        <li className={`flex items-center ${checks.lowercase ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
          <span className="mr-2">{checks.lowercase ? "✓" : "✗"}</span>
          Au moins une lettre minuscule
        </li>
        <li className={`flex items-center ${checks.uppercase ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
          <span className="mr-2">{checks.uppercase ? "✓" : "✗"}</span>
          Au moins une lettre majuscule
        </li>
        <li className={`flex items-center ${checks.number ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
          <span className="mr-2">{checks.number ? "✓" : "✗"}</span>
          Au moins un chiffre
        </li>
        <li className={`flex items-center ${checks.special ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
          <span className="mr-2">{checks.special ? "✓" : "✗"}</span>
          Au moins un caractère spécial
        </li>
      </ul>
    </div>
  );
};

PasswordValidator.propTypes = {
  password: PropTypes.string.isRequired
};

export default PasswordValidator;
