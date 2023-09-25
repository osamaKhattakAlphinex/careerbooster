import Link from "next/link";

interface Props {
  type: "button" | "link";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  type,
  disabled,
  onClick,
  className,
  children,
}) => {
  if (type === "button") {
    return (
      <button
        className={className}
        disabled={disabled ? disabled : false}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link href="/">
        <a className="btn btn-outline-primary-dark">Link</a>
      </Link>
    );
  }
};
export default Button;
