const GlobalIssueRE = /https:\/\/sentry\.io\/organizations\/(.+?)\/issues\/([a-z0-9]+)/
const SubdomainIssueRe = /https:\/\/(.+?)\.sentry\.io\/issues\/([a-z0-9]+)/

export const validSentryURL = (url) => {
  return url.match(GlobalIssueRE) || url.match(SubdomainIssueRe);
}

export const parseSentryUrl = (url) => {
  let match = url.match(SubdomainIssueRe)
  if (!match) {
    match = url.match(GlobalIssueRE)
  }

  if (!match) {
    return null
  }

  const [_, orgid, issue_id] = match
  return {
    orgId,
    issueId
  }
}