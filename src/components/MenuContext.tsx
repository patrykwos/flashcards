import React, { createContext, useState, useContext, ReactNode } from "react";

interface MenuContextType {
  showMenu: boolean;
  position: { x: number; y: number };
  openMenu: (e: React.MouseEvent) => void;
  closeMenu: () => void;
  handleSave: () => void;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
}

const MenuContextData = createContext<MenuContextType | undefined>(undefined);

interface MenuContextProviderProps {
  children: ReactNode;
}

export function useMenuContext() {
  const context = useContext(MenuContextData);
  if (context === undefined) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
}

export default function MenuContextProvider({
  children,
}: MenuContextProviderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Save clicked");
    console.log(selectedWords)
    closeMenu();
  };

  const value = {
    showMenu,
    position,
    openMenu,
    closeMenu,
    handleSave,
    selectedWords,
    setSelectedWords
  };

  return (
    <MenuContextData.Provider value={value}>
      {children}
      {showMenu && (
        <div
          style={{
            position: "fixed",
            top: position.y,
            left: position.x,
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </MenuContextData.Provider>
  );
}
