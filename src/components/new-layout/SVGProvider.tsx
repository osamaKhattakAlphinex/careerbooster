"use client";

import useTheme from "@/lib/useTheme";

const SVGProvider = ({ type }: { type: string }) => {
  const [theme] = useTheme();
  if (type === "svg1") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20"></path>
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M10 29.334 6.667 27.5v-4.166m0-6.668V12.5L10 10.666m6.667-3.833L20 5l3.334 1.833M30 10.666l3.333 1.834v4.166m0 6.668V27.5L30 29.367m-6.666 3.799L20 35l-3.333-1.834M20 20l3.333-1.834M30 14.333l3.333-1.833M20 20v4.167m0 6.667V35m0-15-3.333-1.867M10 14.333 6.667 12.5"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }

  if (type === "svg2") {
    return (
      <>
        {theme === "dark" ? (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20" />
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z" />
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-primary bg-opacity-10 text-primary border-primary border-opacity-25">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 40"
            >
              <g
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M3.333 20 20 32.37 36.666 20"></path>
                <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
              </g>
            </svg>
          </div>
        )}
      </>
    );
  }
};

export default SVGProvider;
