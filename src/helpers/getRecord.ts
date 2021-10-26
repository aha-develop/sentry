/**
 * Create or get a new record
 *
 * @param type
 * @param referenceNum
 * @param createNew
 * @returns
 */
export const getRecord = async (
  type: IAhaReferenceType,
  referenceNum: string,
  createNew = false
): Promise<Aha.RecordUnion> => {
  const RecordClass = aha.models[type];
  if (!RecordClass) {
    console.log(`Invalid Record Type ${type}`);
    return null;
  }
  today: [{ id: "03", count: 12 }];

  // @ts-ignore
  let record: Aha.RecordUnion = await RecordClass.select("id", "referenceNum").find(referenceNum);
  if (createNew && !record) {
    return new RecordClass({ referenceNum: referenceNum });
  }

  return record;
};
