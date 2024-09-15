import EventEmitter from "events";
import { CreateDocPayload } from "../services/CreateDocService";

export enum CreateDocEvent {
  CreateDoc = "create doc",
  Done = "done",
}

class CreateDocEmitter extends EventEmitter {
  emitCreateDocEvent(payload: CreateDocPayload) {
    super.emit(CreateDocEvent.CreateDoc, payload);
  }

  emitDoneEvent() {
    super.emit(CreateDocEvent.Done);
  }
}

export default CreateDocEmitter;
