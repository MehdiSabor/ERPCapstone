import React from "react";
import { useSidebar } from "./SidebarContext";
import { Menu } from "antd";
import { AppstoreOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"; // Import needed icons

const Sidebar = () => {
  const { sidebarButtons } = useSidebar();

  // Styling for the sidebar container
  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#fafafa", // A very light grey, close to Apple's background colors
    color: "#333", // Dark text color for contrast
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Apple's system font stack
    fontSize: "14px", // Standard text size
    lineHeight: "1.5",
  };

  // Styling for menu item groups (titles)
  const itemGroupStyle = {
    padding: "20px 15px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#f0f0f0", // Slightly darker background for group titles
    borderBottom: "1px solid #e1e1e1", // Subtle separator
  };

  // Styling for individual menu items
  const menuItemStyle = {
    margin: "5px 0",
    padding: "10px 15px",
    color: "#333", // Dark grey for text
    background: "none",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  };

  // Highlight style for hover states
  const highlightStyle = {
    backgroundColor: "#e1e1e1", // Light grey for hover background
  };

  // Icon style
  const iconStyle = {
    fontSize: "16px", // Icon size
    color: "#666", // Icon color
    marginRight: "10px", // Space between icon and text
  };

  // Prepare specific items with custom icons
  const customItems = sidebarButtons
    .filter((button) => button.key === "list" || button.key === "create")
    .map((button) => {
      const icon =
        button.key === "list" ? (
          <EyeOutlined style={iconStyle} />
        ) : (
          <EditOutlined style={iconStyle} />
        );
      return (
        <Menu.Item
          key={button.key}
          style={menuItemStyle}
          onClick={button.props.onClick}
        >
          {icon}
          {button.props.children}
        </Menu.Item>
      );
    });

  return (
    <div style={sidebarStyle}>
      <Menu
        mode="inline"
        theme="light"
        style={{ width: "250px", borderRight: "none" }}
      >
        <Menu.ItemGroup key="g1" title="MAIN MENU" style={itemGroupStyle}>
          <hr className="my-3" />
          {customItems}
          <hr className="my-3" />
          {sidebarButtons
            .filter(
              (button) => button.key !== "list" && button.key !== "create"
            )
            .map((button, index) => (
              <Menu.Item
                key={button.key || index}
                style={menuItemStyle}
                onClick={button.props.onClick}
                itemActiveBg = '#ffffff'
              >
                {React.cloneElement(button, {
                  style: { ...button.props.style, ...menuItemStyle },
                })}
              </Menu.Item>
            ))}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default Sidebar;
