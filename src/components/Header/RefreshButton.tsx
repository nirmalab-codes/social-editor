import React from "react";
import { Observer } from "mobx-react";
import Tooltip from "../Tooltip";
import { ReactComponent as Refresh } from "../../assets/refresh.svg";
import useStore from "../../hooks/useStore";

export const RefreshButton = () => {
  const { UIStore, imageStore } = useStore();
  return (
    <Observer>
      {() => (
        <div>
          <Tooltip content="Refresh" placement="bottom">
            <Refresh
              className={`${!imageStore.url ? "disabled" : ""}`}
              onClick={() => {
                if (!imageStore.url) {
                  return;
                }
                imageStore.reset();
                UIStore.closeToolbar();
              }}
            />
          </Tooltip>
        </div>
      )}
    </Observer>
  );
};

export default RefreshButton;