import { Encoding, ObjectiveFunction, SearchSubject } from "../../src";
import { DummyCFG } from "./DummyCFG.mock";

export class DummySearchSubject<T extends Encoding> extends SearchSubject<T> {
  protected objectives: ObjectiveFunction<T>[];

  constructor(objectives: ObjectiveFunction<T>[]) {
    super("", "", new DummyCFG(), undefined);
    this.objectives = objectives;
  }

  getObjectives(): ObjectiveFunction<T>[] {
    return this.objectives;
  }

  protected _extractObjectives(stackTrace): void {
    return;
  }

  protected _extractPaths(): void {
    // mock
  }
}
