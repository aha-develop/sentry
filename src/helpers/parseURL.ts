/**
 * Parse Url using wild card pattern
 *
 * @param url
 * @param pattern Parse URL Pattern - EX:'/organizations/:org_id/issues/:issue_id'
 *
 * @returns
 */
export const parseURL = (url: string, pattern: string) => {
  let regExp = RegExp(
    `^${pattern
      .replace(/(\/?)\*/g, "($1.*)?")
      .replace(/\/$/, "")
      .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3")
      .replace(/\.(?=[\w(])/, "\\.")}/*$`
  );
  const urlObj = new URL(url);
  const match = urlObj.pathname.match(regExp) || [];
  return match.groups;
};
