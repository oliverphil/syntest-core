/*
 * Copyright 2020-2021 Delft University of Technology and SynTest contributors
 *
 * This file is part of SynTest Framework - SynTest Core.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Budget } from "./Budget";
import { Encoding } from "../Encoding";
import { SearchAlgorithm } from "../metaheuristics/SearchAlgorithm";

/**
 * Budget for the number of iterations performed during the search process.
 *
 * @author Mitchell Olsthoorn
 */
export class DistanceEarlyStoppingBudget<T extends Encoding> implements Budget<T> {
    /**
     * If the budget is tracking progress
     * @protected
     */
    protected _tracking: boolean;

    /**
     * Constructor.
     *
     * @param maxIterations The maximum number of iterations of this budget
     */
    constructor(maxIterations = Number.MAX_SAFE_INTEGER) {
        this._tracking = false;
    }

    /**
     * @inheritDoc
     */
    getRemainingBudget(): number {
        return global.distance;
    }

    /**
     * @inheritDoc
     */
    getUsedBudget(): number {
        return global.distance;
    }

    /**
     * @inheritDoc
     */
    getTotalBudget(): number {
        return global.distance;
    }

    /**
     * @inheritDoc
     */
    reset(): void {
        this._tracking = false;
    }

    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    initializationStarted(): void {}

    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    initializationStopped(): void {}

    /**
     * @inheritDoc
     */
    searchStarted(): void {
        this._tracking = true;
    }

    /**
     * @inheritDoc
     */
    searchStopped(): void {
        this._tracking = false;
    }

    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    iteration(searchAlgorithm: SearchAlgorithm<T>): void {}

    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    evaluation(encoding: T): void {}
}
