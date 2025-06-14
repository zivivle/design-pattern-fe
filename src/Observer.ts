import { ChromeGrimpan } from "./Grimpan";

abstract class Observer {
  abstract subscribe(v: Listener): void;
  abstract unsubscribe(name: string): void;
  abstract publish(): void;
}

interface Listener {
  name: string;
  publish: (event: string) => void;
}

export class SubscribeManager {
  listeners: {
    [key: string]: Listener[];
  } = {};
  // 싱글톤 패턴 적용
  private static instance: SubscribeManager;
  private constructor() {}

  addEvent(event: string) {
    if (this.listeners[event]) {
      return this.listeners[event];
    }
    this.listeners[event] = [];
    return this.listeners[event];
  }

  subscribe(event: string, v: Listener) {
    this.listeners[event].push(v);
  }

  unsubscribe(event: string, name: string) {
    this.listeners[event] = this.listeners[event].filter(
      (v) => v.name !== name
    );
  }

  publish(event: string) {
    this.listeners[event].forEach((target) => target.publish(event));
  }

  // 싱글톤 패턴 적용
  static getInstance() {
    if (!this.instance) {
      this.instance = new SubscribeManager();
    }
    return this.instance;
  }
}

export class SaveCompleteObserver extends Observer {
  listeners: Listener[] = [];

  override subscribe(v: Listener) {
    this.listeners.push(v);
  }

  override unsubscribe(name: string) {
    this.listeners = this.listeners.filter((v) => v.name !== name);
  }

  override publish() {
    this.listeners.forEach((target) => target.publish("saveComplete"));
  }
}
