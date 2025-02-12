import React from "react";
import { Observer, observer } from "mobx-react";

import { ReactComponent as Save } from "../../assets/save.svg";
import Tooltip from "../Tooltip";
import useStore from "../../hooks/useStore";

export const SaveButton: React.FC = () => {
  const { canvasStore, imageStore, UIStore } = useStore();
  const saveImage = () => {
    if (!imageStore.url || UIStore.isToolbarOpen) {
      return;
    }
    const randomNum = Math.floor(Math.random() * 1000);
    const fileName = `image-${randomNum}.png`;
    const link = document.createElement("a");
    link.download = fileName;
    link.href = canvasStore.getDataUrl();

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
  };

  return (
    <Observer>
      {() => (
        <Tooltip content="Save" placement="bottom">
          <Save
            className={`${!imageStore.url || UIStore.isToolbarOpen ? "disabled" : ""
              }`}
            onClick={saveImage}
          />
        </Tooltip>
      )}
    </Observer>
  );
};

export default observer(SaveButton);