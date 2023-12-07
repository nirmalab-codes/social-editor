import React from "react";
import { observer } from "mobx-react";
import Tooltip from "../Tooltip";
import useStore from "../../hooks/useStore";
import { ReactComponent as Undo } from "../../assets/undo.svg";

export const UndoButton = observer(() => {
  const { UIStore, canvasStore } = useStore();
  return (
    <div>
      <Tooltip content="Undo" placement="bottom">
        <Undo
          className={`${!UIStore.canUndo ? "disabled" : ""}`}
          onClick={() => {
            if (!UIStore.canUndo) {
              return;
            }
            canvasStore.history.undo();
          }}
        />
      </Tooltip>
    </div>
  );
});

export default UndoButton;