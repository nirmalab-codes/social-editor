import React from "react";
import { ReactComponent as Crop } from "../assets/crop.svg";
import { ReactComponent as Flip } from "../assets/flip.svg";
import { ReactComponent as Draw } from "../assets/pencil.svg";
import { ReactComponent as Text } from "../assets/text.svg";
import { ReactComponent as Search } from "../assets/search.svg";

import { ReactComponent as Adjust } from "../assets/adjust.svg";
import Tooltip from "./Tooltip";
import useStore from "../hooks/useStore";
import { Observer } from "mobx-react";
import { ModeName } from "../stores/canvasStore";

interface IMenuItems {
  icon: React.ReactElement;
  name: ModeName;
  handler: () => void;
  tooltip?: string;
}

const Menu: React.FC = () => {
  const { UIStore, canvasStore, imageStore } = useStore();

  const handleClick = (modeName: ModeName) => {
    if (!imageStore.url && modeName !== "search") {
      alert("Choose Image First");
      return;
    }

    UIStore.toggleToolbar(modeName);

    if (canvasStore.mode && canvasStore.scale !== 1) {
      if (canvasStore.mode !== "search") {
        canvasStore.setScale(1);
      }
    }

    if (!canvasStore.mode) {
      canvasStore.resetToBaseScale();
    }
  };

  const items: IMenuItems[] = [
    {
      icon: <Search />,
      name: "search",
      handler: () => handleClick("search"),
      tooltip: "Upload an image from Unsplash",
    },
    {
      icon: <Crop />,
      name: "crop",
      handler: () => handleClick("crop"),
    },
    {
      icon: <Flip />,
      name: "adjust",
      handler: () => handleClick("adjust"),
    },
    {
      icon: <Draw />,
      name: "drawing",
      handler: () => handleClick("drawing"),
    },
    {
      icon: <Text />,
      name: "text",
      handler: () => handleClick("text"),
    },
    {
      icon: <Adjust />,
      name: "effects",
      handler: () => handleClick("effects"),
    },
  ];
  return (
    <section className="menu">
      <div className="menu__wrapper">
        {items.map((item) => (
          <div key={item.name}>
            <Observer>
              {() => (
                <Tooltip content={item.tooltip || item.name} placement="right">
                  <div
                    className={`menu__item ${canvasStore.mode === item.name ? "menu__item_active" : ""
                      } ${!imageStore.url && item.name !== "search" ? "disabled" : ""}`}
                    onClick={item.handler}
                  >
                    {item.icon}
                  </div>
                </Tooltip>
              )}
            </Observer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;