import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { observer, Observer } from "mobx-react";

import { ReactComponent as Close } from "../../assets/close.svg";
import useStore from "../../hooks/useStore";

import ToolbarCrop from "./ToolbarCrop";
import ToolbarRotate from "./ToolbarRotate";
import ToolbarDrawing from "./ToolbarDrawing";
import ToolbarText from "./ToolbarText";
import ToolbarSearch from "./ToolbarSearch";
import ToolbarEffects from "./ToolbarEffects";


const Toolbar: React.FC = observer(() => {
  const nodeRef = React.useRef(null);
  const { UIStore, canvasStore } = useStore();
  const contentMap: { [name: string]: JSX.Element } = {
    search: <ToolbarSearch />,
    crop: <ToolbarCrop />,
    adjust: <ToolbarRotate />,
    drawing: <ToolbarDrawing />,
    text: <ToolbarText />,
    effects: <ToolbarEffects />,
  };

  return (
    <Observer>
      {() => (
        <TransitionGroup component={null}>
          {UIStore.isToolbarOpen && (
            <CSSTransition
              timeout={0}
              classNames="toolbar"
              nodeRef={nodeRef}
            >
              <section className={`toolbar custom-scrollbar ${canvasStore.mode === "search" ? "toolbar_search" : ""
                }`}>
                <div className="toolbar__header">
                  <h4 className="toolbar__title">{canvasStore.mode}</h4>
                  <Close onClick={() => {
                    canvasStore.resetToBaseScale();
                    UIStore.closeToolbar();
                  }} />
                </div>
                {contentMap[canvasStore.mode]}
              </section>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </Observer>
  );
});

export default Toolbar;