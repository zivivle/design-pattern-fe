import { Grimpan } from "../Grimpan.js";
import { GrimpanHistory } from "../GrimpanHistory.js";

export abstract class Command {
  abstract execute(): void;
}

export class BackCommand extends Command {
  name = "back";

  constructor(public history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.undo();
  }
}

export class ForwardCommand extends Command {
  name = "forward";

  constructor(public history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.redo();
  }
}

export class PenSelectCommand extends Command {
  name = "penSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("pen");
  }
}

export class SaveHistoryCommand extends Command {
  name = "saveHistory";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.history.saveHistory();
  }
}

export class EraserSelectCommand extends Command {
  name = "eraserSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("eraser");
  }
}

export class CircleSelectCommand extends Command {
  name = "circleSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("circle");
  }
}

export class RectangleSelectCommand extends Command {
  name = "rectangleSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("rectangle");
  }
}

export class PipetteSelectCommand extends Command {
  name = "pipetteSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("pipette");
  }
}

export class SaveCommand extends Command {
  name = "save";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.saveStrategy();
  }
}
