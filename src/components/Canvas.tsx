import { observer, Observer } from "mobx-react";
import React, { useRef, useEffect } from "react";
import useStore from "../hooks/useStore";

const Canvas = () => {
  const canvasRef = useRef<HTMLElement>(null);
  const canvasEl = canvasRef.current;
  const rootStore = useStore();
  const { UIStore } = rootStore;

  useEffect(() => {
    if (!canvasEl) {
      return;
    }
    rootStore.addCanvasToDocument(canvasEl);
  }, [canvasEl, rootStore]);

  return (
    <Observer>{() => (
      <section
        className={`canvas custom-scrollbar ${UIStore.isToolbarOpen ? "canvas_toolbar-open" : ""
          }`}
        ref={canvasRef}
      ></section>
    )}</Observer>
  );
};

export default observer(Canvas);