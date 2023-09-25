import Link from "next/link";
import { type } from "os";
interface Props {
  type: "button" | "link";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  childern: React.ReactNode;
}

const Button = ({ type, disabled, onClick, className, childern }: any) => {
  if (type === "button") {
    return (
      <button
        className={className ? className : ""}
        onClick={onClick ? onClick : console.log("clicked")}
        disabled={disabled ? disabled : false}
      >
        {childern}
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
