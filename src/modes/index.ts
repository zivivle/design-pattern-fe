import {
  CircleSelectCommand,
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
} from "./../commands/index.js";
import { Grimpan } from "../Grimpan.js";
import { rgb2hex } from "../utils/rgb2hex.js";

export abstract class Mode {
  constructor(protected grimpan: Grimpan) {}

  abstract mousedown(e: MouseEvent): void;
  abstract mousemove(e: MouseEvent): void;
  abstract mouseup(e: MouseEvent): void;
}

export class PenMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PenSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = "round";
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = "source-over";
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(e: MouseEvent): void {
    this.grimpan.active = false;
    // 히스토리 저장
  }
}

export class EraserMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new EraserSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 10;
    this.grimpan.ctx.lineCap = "round";
    this.grimpan.ctx.globalCompositeOperation = "destination-out";
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(e: MouseEvent): void {
    this.grimpan.active = false;
    // 히스토리 저장
  }
}

export class CircleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new CircleSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {}
  override mousemove(e: MouseEvent): void {}
  override mouseup(e: MouseEvent): void {}
}

export class RectangleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new RectangleSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {}
  override mousemove(e: MouseEvent): void {}
  override mouseup(e: MouseEvent): void {}
}

export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PipetteSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {}
  override mousemove(e: MouseEvent): void {
    const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    if (data[3] === 0) {
      // data[3] 값이 투명도이기 때문에 투명도가 0이면 그려지지않았거나 투명한 부분이라는 뜻
      this.grimpan.changeColor("#ffffff");
    } else {
      this.grimpan.changeColor(rgb2hex(data[0], data[1], data[2]));
    }
  }
  override mouseup(e: MouseEvent): void {
    this.grimpan.setMode("pen");
  }
}
