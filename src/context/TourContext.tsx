"use client";
import React, { createContext, useContext, useRef, ReactNode } from "react";

// Define a type for your references
interface TourRefs {
  contentScrollRef: React.MutableRefObject<HTMLInputElement | null>;
  dashboardRef: React.MutableRefObject<HTMLInputElement | null>;
  innerToolsRef: React.MutableRefObject<HTMLInputElement | null>;
  resumeElementRef: React.MutableRefObject<HTMLInputElement | null>;
  coverLetterElementRef: React.MutableRefObject<HTMLInputElement | null>;
  linkedinElementRef: React.MutableRefObject<HTMLInputElement | null>;
  emailElementRef: React.MutableRefObject<HTMLInputElement | null>;
  bidElementRef: React.MutableRefObject<HTMLInputElement | null>;
  coachElementRef: React.MutableRefObject<HTMLInputElement | null>;
  reviewElementRef: React.MutableRefObject<HTMLInputElement | null>;
  finderElementRef: React.MutableRefObject<HTMLInputElement | null>;
  atsElementRef: React.MutableRefObject<HTMLInputElement | null>;
  tourBotRef: React.MutableRefObject<HTMLInputElement | null>;
  historyCardRef: React.MutableRefObject<HTMLInputElement | null>;
  emailCardsElementRef: React.MutableRefObject<HTMLInputElement | null>;
  // Add more references as needed
}

// Create a context with an initial value
const TourContext = createContext<TourRefs | undefined>(undefined);

// Create a provider component to wrap your app
interface TourContextProviderProps {
  children: ReactNode;
}

const TourContextProvider: React.FC<TourContextProviderProps> = ({
  children,
}) => {
  // Create refs for each reference
  const contentScrollRef = useRef<HTMLInputElement | null>(null);
  const dashboardRef = useRef<HTMLInputElement | null>(null);
  const innerToolsRef = useRef<HTMLInputElement | null>(null);
  const resumeElementRef = useRef<HTMLInputElement | null>(null);
  const coverLetterElementRef = useRef<HTMLInputElement | null>(null);
  const linkedinElementRef = useRef<HTMLInputElement | null>(null);
  const emailElementRef = useRef<HTMLInputElement | null>(null);
  const bidElementRef = useRef<HTMLInputElement | null>(null);
  const coachElementRef = useRef<HTMLInputElement | null>(null);
  const reviewElementRef = useRef<HTMLInputElement | null>(null);
  const finderElementRef = useRef<HTMLInputElement | null>(null);
  const atsElementRef = useRef<HTMLInputElement | null>(null);
  const tourBotRef = useRef<HTMLInputElement | null>(null);
  const historyCardRef = useRef<HTMLInputElement | null>(null);
  const emailCardsElementRef = useRef<HTMLInputElement | null>(null);
  // Define the context value
  const contextValue: TourRefs = {
    contentScrollRef,
    innerToolsRef,
    dashboardRef,
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
    tourBotRef,
    historyCardRef,
    emailCardsElementRef,
    // Add more references as needed
  };

  return (
    <TourContext.Provider value={{ ...contextValue }}>
      {children}
    </TourContext.Provider>
  );
};

// Create a custom hook to access the context values
const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTourContext must be used within a TourContextProvider");
  }
  return context;
};

export { TourContextProvider, useTourContext };
