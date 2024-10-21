import { EventEmitter } from "events";

import CreateDocService, {
  CreateDocPayload,
} from "../services/CreateDocService";
import WaitGroup from "../utils/wait-group";
import logger from "../logger";
import { CreateDocEvent } from "../events/CreateDocEmitter";

class CreateDocWorker {
  constructor(
    private emitter: EventEmitter,
    private createDocService: CreateDocService,
    private waitGroup: WaitGroup
  ) {}

  start(done?: () => void) {
    this.emitter.on(CreateDocEvent.CreateDoc, async (payload: CreateDocPayload) => {
      logger.info(`Waiting for ${this.waitGroup.current()} docs to finish processing...`);
      this.waitGroup.add();
      await this.waitGroup.until(1);
      logger.info("Creating doc...");

      this.createDocService
        .execute(payload)
        .then(() => {
          this.waitGroup.done();
          logger.info(`Doc created: ${payload.title}`);
        })
        .catch((error) => {
          logger.error("Error creating doc:", error);
          this.waitGroup.done();
        });
    });

    this.emitter.on(CreateDocEvent.Done, async () => {
      await this.waitGroup.wait();

      logger.info("All docs created!");

      done?.();
    });
  }
}

export default CreateDocWorker;
