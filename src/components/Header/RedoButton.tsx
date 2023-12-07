import React from "react";
import { observer } from "mobx-react";
import Tooltip from "../Tooltip";
import useStore from "../../hooks/useStore";
import { ReactComponent as Redo } from "../../assets/redo.svg";

export const RedoButton = observer(() => {
  const { UIStore, canvasStore } = useStore();
  return (
    <div>
      <Tooltip content="Redo" placement="bottom">
        <Redo
          className={`${!UIStore.canRedo ? "disabled" : ""}`}
          onClick={() => {
            if (!UIStore.canRedo) {
              return;
            }
            canvasStore.history.redo();
          }}
        />
      </Tooltip>
    </div>
  );
});

export default RedoButton;