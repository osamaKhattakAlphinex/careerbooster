import Link from "next/link";
interface Props {
  type: "button" | "link";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  href?: string;
}

const Button: React.FC<Props> = ({
  type,
  disabled,
  onClick,
  className,
  children,
  id,
  href,
}: any) => {
  if (type === "button") {
    return (
      <button
        className={className ? className : ""}
        onClick={onClick ? onClick : console.log("clicked")}
        disabled={disabled ? disabled : false}
        id={id ? id : ""}
      >
        {children}
      </button>
    );
  }
  if (type === "link") {
    <Link href={href} className="btn theme-outline-btn">
      {children}
    </Link>;
  }
};

export default Button;
