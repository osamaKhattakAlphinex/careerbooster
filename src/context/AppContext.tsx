"use client";
import React, { createContext, useContext,  ReactNode, useState } from "react";

// Define a type for your references
interface AppContexts {
  availableCredits: boolean;
  setAvailableCredits:any;
  abortController: AbortController;

  // Add more references as needed
}

// Create a context with an initial value
const AppContext = createContext<AppContexts | undefined>(undefined);

// Create a provider component to wrap your app
interface AppContextsProvider {
  children: ReactNode;
}

const AppContextsProvider: React.FC<AppContextsProvider> = ({
  children,
}) => {
  // Create refs for each reference
const [availableCredits,setAvailableCredits] = useState<boolean>(false)
const [abortController, setAbortController] = useState<AbortController>(new AbortController());
  // Define the context value
  const contextValue: AppContexts = {
    availableCredits,
    setAvailableCredits,
    abortController,
  };

  return (
    <AppContext.Provider value={{ ...contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to access the context values
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a TourContextProvider");
  }
  return context;
};

export { AppContextsProvider, useAppContext };
