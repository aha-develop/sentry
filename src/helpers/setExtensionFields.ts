import { IDENTIFIER } from "./config";

/**
 * Save Extension Fields
 *
 * @param record
 * @param fields
 * @param identifier
 * @returns
 */
export const setExtensionFields = async (
  record: Aha.RecordUnion,
  fields: ISentryFields = {},
  identifier = IDENTIFIER
) => {
  if (!Object.keys(fields).length) {
    return;
  }

  for await (const key of Object.keys(fields)) {
    await record.setExtensionField(identifier, key, fields[key]);
  }
};
