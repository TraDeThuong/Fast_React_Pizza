import { useNavigate, Link } from "react-router-dom";

export default function LinkButton({ children, to, variant = "link" }) {
  const navigate = useNavigate();

  const base =
    "font-medium transition duration-200";

  const styles = {
    primary:
      "bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full",
    link:
      "text-amber-600 hover:text-amber-700",
  };

  if (to === -1) {
    return (
      <button
        onClick={() => navigate(-1)}
        className={`${base} ${styles.primary}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}