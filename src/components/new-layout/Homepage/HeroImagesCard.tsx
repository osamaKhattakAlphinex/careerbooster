"use client";

import useTheme from "@/lib/useTheme";
import Image from "next/image";

export default function HeroImagesCard() {
  const [theme] = useTheme();

  let url = "/assets/images/review-logos/trustpilot_reviews_2.svg";
  let url2 = "/assets/images/review-logos/capterra_reviews_2.svg";

  if (theme === "dark") {
    url = "/assets/images/review-logos/trustpilot_reviews.svg";
    url2 = "/assets/images/review-logos/capterra_reviews.svg";
  }

  return (
    <div className="d-flex gap-8 align-center justify-center mt-12 review-badges">
      <Image width={185} height={38} className="img-fluid" src={url} alt="" />
      <Image width={185} height={38} className="img-fluid" src={url2} alt="" />
    </div>
  );
}
