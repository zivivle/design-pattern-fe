export class StackIterator {
    stack;
    index = 0;
    constructor(stack) {
        this.stack = stack;
    }
    next() {
        if (!this.done) {
            return this.stack[this.index++];
        }
    }
    get done() {
        return this.stack.length === this.index;
    }
}
