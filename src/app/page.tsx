"use client";
import ReduxProvider from "@/components/ReduxProvider";
import Homepage from "@/components/homepage";

export default function Home() {
  return (
    <ReduxProvider>
      <Homepage />
    </ReduxProvider>
  );
}
