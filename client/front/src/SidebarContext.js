import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sidebarButtons, setSidebarButtons] = useState([]);

    return (
        <SidebarContext.Provider value={{ sidebarButtons, setSidebarButtons }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
