import { observable, action, makeObservable } from "mobx";
import { RootStore } from "./rootStore";
import { ModeName } from "./canvasStore";

export class UIStore {
  @observable isToolbarOpen: boolean = false;
  @observable canUndo: boolean = false;
  @observable canRedo: boolean = false;

  constructor(private readonly root: RootStore) {
    makeObservable(this);
  }

  @action toggleToolbar(mode: ModeName): void {
    if (this.root.canvasStore.mode === mode || !this.isToolbarOpen) {
      this.isToolbarOpen = !this.isToolbarOpen;
    }
    this.isToolbarOpen = false;
    this.root.canvasStore.setMode("");
    setTimeout(() => {
      this.isToolbarOpen = true;
      this.root.canvasStore.setMode(mode);
    }, 50);
  }

  @action closeToolbar(): void {
    this.isToolbarOpen = false;
    this.root.canvasStore.setMode("");
  }

  @action updateHistoryButtons(
    canUndo: boolean,
    canRedo: boolean,
  ): void {
    this.canUndo = canUndo;
    this.canRedo = canRedo;
  }
}