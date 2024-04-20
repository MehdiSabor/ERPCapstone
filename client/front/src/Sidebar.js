import React from 'react';
import { useSidebar } from './SidebarContext';
import { Menu } from 'antd';


const Sidebar = () => {
    const { sidebarButtons } = useSidebar();

    const sidebarStyle = {
        width: '250px',
        height: '100vh',
        borderRight: '1px solid #ddd'
    };

    return (
        <div style={sidebarStyle}>
            <Menu
                mode="inline"
                theme="light"
                style={{ borderRight: 'none' }}
            >
                <Menu.ItemGroup key="g1" title="Sidebar Menu" style={{ color: 'grey' }}>
                    {sidebarButtons.map((button, index) => (
                        <Menu.Item key={index} style={{ margin: '10px 0', padding: '10px' }}>
                            {React.cloneElement(button, {
                                style: { 
                                    color: 'grey',
                                    borderColor: 'grey',
                                    textAlign: 'left',
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    boxShadow: 'none',
                                    cursor: 'pointer'
                                }
                            })}
                        </Menu.Item>
                    ))}
                </Menu.ItemGroup>
            </Menu>
        </div>
    );
};

export default Sidebar;
