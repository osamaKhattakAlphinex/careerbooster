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
}: any) => {
  if (type === "button") {
    return (
      <button
        className={className ? className : ""}
        onClick={onClick ? onClick : console.log("clicked")}
        disabled={disabled ? disabled : false}
      >
        {children}
      </button>
    );
  }
  if (type === "link") {
    <Link href="#">
      <a href="" className="btn btn-outline-primary-dark">
        link
      </a>
    </Link>;
  }
};

export default Button;
