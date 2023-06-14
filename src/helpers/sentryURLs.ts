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

  const [_, orgId, issueId] = match
  return {
    orgId,
    issueId
  }
}

export const ValidationMessage = "Please enter a valid Sentry URL. It should match 'https://:org_name.sentry.io/issues/:issue_id' or 'https://sentry.io/organizations/:org_id/issues/:issue_id'."