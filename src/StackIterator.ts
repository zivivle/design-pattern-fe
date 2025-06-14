import { HistoryStack } from "./GrimpanHistory.js";

export class StackIterator {
  private index = 0;
  constructor(private readonly stack: HistoryStack) {}

  next() {
    if (!this.done) {
      return this.stack[this.index++];
    }
  }

  get done() {
    return this.stack.length === this.index;
  }
}
