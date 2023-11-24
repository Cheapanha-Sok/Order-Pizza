import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const base = "bg-yellow-500 px-3 py-3 rounded-full text-white";

  const style = {
    primary: base + " py-3 px-4 sm:px-6 sm:py-4",
    small: base + " px-4 py-2 text-xs md:px-5 md:py-2.5",
    round: base + " px-2.5 py-1 text-xs md:px-3.5 md:py-2 md:text-sm",
  };
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} className={style[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  );
}
