"use client";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/public-pages/layout/Header";
import Footer from "@/components/public-pages/layout/Footer";
import HeroArea from "../resume-builder/HeroArea";
import CoverLetterHeroArea from "../cover-letter-generator/HeroArea";
import EmailHeroArea from "../email-assistant/HeroArea";
import LinkedinHeroArea from "../linkedin/HeroArea";
import LinkedInToolMain from "../linkedin/LinkedInToolMain";
import LinkedInUploadPDFResume from "../linkedin/LinkedInUploadPDFResume";

const Onboard = () => {
  const onBoardRoutes = [
    "/resume-builder",
    "/cover-letter-generator",
    "/email-assistant",
    "/linkedin-optimizer",
    "/linkedin-optimizer/result"
  ];
  const pathname = usePathname();
  if (onBoardRoutes.includes(pathname)) {
    return (
      <>
        <Header />
        {pathname === "/resume-builder" && (
          <div className="flex-grow-1  w-full">
            <section className="">
              <div className="flex flex-col text-white">
                <HeroArea />
              </div>
            </section>
          </div>
        )}
        {pathname === "/cover-letter-generator" && (
          <div className="flex-grow-1  w-full">
            <section className="">
              <div className="flex flex-col text-white">
                <CoverLetterHeroArea />
              </div>
            </section>
          </div>
        )}
        {pathname === "/email-assistant" && (
          <div className="flex-grow-1  w-full">
            <section className="">
              <div className="flex flex-col text-white">
                <EmailHeroArea />
              </div>
            </section>
          </div>
        )}
        {pathname === "/linkedin-optimizer" && (
          <div className="flex-grow-1  w-full">
            <section className="">
              <div className="flex flex-col text-white">
                <LinkedinHeroArea />
                <LinkedInToolMain />
              </div>
            </section>
          </div>
        )}
        {pathname === "/linkedin-optimizer/result" && (
          <main className="flex-grow-1 bg-gradient-to-r from-gray-950 via-blue-950 to-purple-900">
          {/* LinkedIn Tool Card */}
          <section className="pt-14">
            <div className=" flex flex-col items-center">
              <LinkedInUploadPDFResume />
            </div>
          </section>
        </main>
        )}
        <Footer />
      </>
    );
  } else {
    redirect("/login")
  }
};

export default Onboard;
