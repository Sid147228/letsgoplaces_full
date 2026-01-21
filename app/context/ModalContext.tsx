"use client";

import { createContext, useContext, useState } from "react";

type ModalContextType = {
  showSignIn: boolean;
  openSignIn: () => void;
  closeSignIn: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showSignIn,
        openSignIn: () => setShowSignIn(true),
        closeSignIn: () => setShowSignIn(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
