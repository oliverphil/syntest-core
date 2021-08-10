import { Encoding } from "../search/Encoding";
import { StatisticsCollector } from "./StatisticsCollector";
import * as csv from "@fast-csv/format";
import { RuntimeVariable } from "./RuntimeVariable";
import * as fs from "fs";

/**
 * Writer for the coverage over time statistics.
 *
 * @author Mitchell Olsthoorn
 */
export class CoverageWriter<T extends Encoding> {
  protected VARIABLES: RuntimeVariable[] = [RuntimeVariable.SUBJECT];

  protected EVENT_VARIABLES: RuntimeVariable[] = [RuntimeVariable.COVERAGE];

  /**
   * Write the coverage statistics to file.
   *
   * @param collector The collector for the statistics
   * @param filePath The file path to write to
   */
  write(collector: StatisticsCollector<T>, filePath: string) {
    const staticVariables = collector.getVariables();
    const events = collector.getEventVariables();

    const data = [];
    const lastVariableValues = new Map<RuntimeVariable, any>();

    // Loop over all recorded times
    for (const time of events.keys()) {
      const event = events.get(time);

      const row = {};

      // Add time
      row["TIME"] = time;

      // For each enabled static statistic, copy the data from the collector over
      this.VARIABLES.forEach((variable) => {
        row[RuntimeVariable[variable]] = staticVariables.get(variable);
      });

      // For each enabled event statistic, copy the data from the collector over
      this.EVENT_VARIABLES.forEach((variable) => {
        // If the variable exists in the collector use it, otherwise get the last value
        if (event.has(variable)) {
          const value = event.get(variable);
          row[RuntimeVariable[variable]] = value;

          // Update last values
          if (
            !lastVariableValues.has(variable) ||
            value != lastVariableValues.get(variable)
          ) {
            lastVariableValues.set(variable, value);
          }
        } else {
          if (lastVariableValues.has(variable)) {
            row[RuntimeVariable[variable]] = lastVariableValues.get(variable);
          } else {
            row[RuntimeVariable[variable]] = null;
          }
        }
      });

      data.push(row);
    }

    // Create a write stream in append mode
    const ws = fs.createWriteStream(filePath, { flags: "a" });

    // Write the data to the stream and add headers when the file does not exist
    csv.writeToStream(ws, data, {
      headers: !fs.existsSync(filePath),
      includeEndRowDelimiter: true,
    });
  }
}
