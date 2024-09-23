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
    this.emitter.on(CreateDocEvent.CreateDoc, (data: CreateDocPayload) => {
      this.waitGroup.add();

      this.createDocService
        .execute(data)
        .then(() => {
          this.waitGroup.done();
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
