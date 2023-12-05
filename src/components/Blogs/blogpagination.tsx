import Link from "next/link";

export default function BlogPagination() {
  return (
    <div className="text-center mt-18">
      <ul className="pagination flex-wrap justify-center gap-4">
        <li className="page-item">
          <Link className="page-link disabled" href="#" aria-label="Previous">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M5 12h14M5 12l4 4m-4-4 4-4" />
            </svg>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link active" href="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            ...
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            10
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#" aria-label="Next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M5 12h14m-4 4 4-4m-4-4 4 4" />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
}
