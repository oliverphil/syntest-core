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

import { Encoding } from "../Encoding";
import { SearchSubject } from "../SearchSubject";

/**
 * Function that models the objective.
 *
 * @author Mitchell Olsthoorn
 */
export interface ObjectiveFunction<T extends Encoding> {
  /**
   * Calculate distance from the objective to an encoding.
   *
   * @param encoding Encoding
   */
  calculateDistance(encoding: T): number;

  /**
   * Return the identifier of the objective.
   */
  getIdentifier(): string;

  getSubject(): SearchSubject<T>;
}
