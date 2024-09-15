import EventEmitter from "events";
import logger from "../logger";

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
}

export default WaitGroup;