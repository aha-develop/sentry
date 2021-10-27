import { IDENTIFIER } from "./config";

/**
 * Run Extension Command
 *
 * @param record
 * @param command
 * @param identifier
 */
export const runCommand = async (record: Aha.RecordUnion, command: Command, identifier = IDENTIFIER) => {
  await aha.command(`${identifier}.${command}`, { record });
};
