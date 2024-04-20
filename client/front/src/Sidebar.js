import React from 'react';
import { useSidebar } from './SidebarContext';

const Sidebar = () => {
    const { sidebarButtons } = useSidebar();

    return (
        <div style={{ width: '250px', background: '#555', color: 'white', height: 'calc(100vh - 70px)', padding: '10px' }}>
            <div>Sidebar Menu</div>
            <div>
                {sidebarButtons.map((button, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        {button}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
