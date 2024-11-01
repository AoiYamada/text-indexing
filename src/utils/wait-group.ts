import EventEmitter from "events";
import logger from "../logger";
import { int } from "@/types/alias";

class WaitGroup extends EventEmitter {
  private count: number;

  constructor() {
    super();
    this.count = 0;
  }

  add() {
    this.count++;
  }

  done() {
    this.count--;
    if (this.count === 0) {
      this.emit("done");
    }
  }

  wait() {
    if (this.count === 0) {
      return Promise.resolve();
    }

    logger.info("Waiting for issues to finish processing...");

    return new Promise((resolve) => {
      this.once("done", resolve);
    });
  }

  addUntil(n: int) {
    return new Promise((resolve) => {
      if (this.count <= n - 1) {
        this.add();
        resolve(null);
      }

      const interval = setInterval(() => {
        logger.info(`Waiting for count: ${this.count}`);
        if (this.count <= n - 1) {
          clearInterval(interval);
          this.add();
          resolve(null);
        }
      }, 500);
    });
  }

  current() {
    return this.count;
  }
}

export default WaitGroup;
