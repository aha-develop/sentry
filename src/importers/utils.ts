/**
 * Convert payload to options for select
 *
 * @param el
 * @returns
 */
export const convertOptions = (el: any): Aha.FilterValue => {
  return {
    text: el.name,
    value: el.slug,
  };
};
