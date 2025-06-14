import { CircleSelectCommand, EraserSelectCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand, SaveHistoryCommand, } from "./../commands/index.js";
import { rgb2hex } from "../utils/rgb2hex.js";
export class Mode {
    grimpan;
    constructor(grimpan) {
        this.grimpan = grimpan;
    }
    invoke(command) {
        command.execute();
    }
}
export class PenMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new PenSelectCommand(grimpan));
    }
    mousedown(e) {
        this.grimpan.active = true;
        this.grimpan.ctx.lineWidth = 1;
        this.grimpan.ctx.lineCap = "round";
        this.grimpan.ctx.strokeStyle = this.grimpan.color;
        this.grimpan.ctx.globalCompositeOperation = "source-over";
        this.grimpan.ctx.beginPath();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mousemove(e) {
        if (!this.grimpan.active) {
            return;
        }
        this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
        this.grimpan.ctx.stroke();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mouseup(e) {
        // 히스토리 저장
        if (this.grimpan.active) {
            this.invoke(new SaveHistoryCommand(this.grimpan));
        }
        this.grimpan.active = false;
    }
}
export class EraserMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new EraserSelectCommand(grimpan));
    }
    mousedown(e) {
        this.grimpan.active = true;
        this.grimpan.ctx.lineWidth = 10;
        this.grimpan.ctx.lineCap = "round";
        this.grimpan.ctx.globalCompositeOperation = "destination-out";
        this.grimpan.ctx.beginPath();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mousemove(e) {
        if (!this.grimpan.active) {
            return;
        }
        this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
        this.grimpan.ctx.stroke();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mouseup(e) {
        // 히스토리 저장
        if (this.grimpan.active) {
            this.invoke(new SaveHistoryCommand(this.grimpan));
        }
        this.grimpan.active = false;
    }
}
export class CircleMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new CircleSelectCommand(grimpan));
    }
    mousedown(e) {
        this.grimpan.active = true;
    }
    mousemove(e) { }
    mouseup(e) {
        // 히스토리 저장
        if (this.grimpan.active) {
            this.invoke(new SaveHistoryCommand(this.grimpan));
        }
    }
}
export class RectangleMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new RectangleSelectCommand(grimpan));
    }
    mousedown(e) {
        this.grimpan.active = true;
    }
    mousemove(e) { }
    mouseup(e) {
        // 히스토리 저장
        if (this.grimpan.active) {
            this.invoke(new SaveHistoryCommand(this.grimpan));
        }
    }
}
export class PipetteMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new PipetteSelectCommand(grimpan));
    }
    mousedown(e) { }
    mousemove(e) {
        const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
        if (data[3] === 0) {
            // data[3] 값이 투명도이기 때문에 투명도가 0이면 그려지지않았거나 투명한 부분이라는 뜻
            this.grimpan.changeColor("#ffffff");
        }
        else {
            this.grimpan.changeColor(rgb2hex(data[0], data[1], data[2]));
        }
    }
    mouseup(e) {
        this.grimpan.setMode("pen");
    }
}
