import { setExtensionFields } from "@helpers/setExtensionFields";
import { validSentryURL, parseSentryUrl } from "@helpers/sentryURLs";

aha.on("addLink", async ({ record }) => {
  const issueURL: string = await aha.commandPrompt("Link URL", {
    placeholder: "Enter the Sentry issue URL",
  });

  if (!validSentryURL(issueURL)) {
    throw new Error("Please enter a valid Sentry URL. It should match 'https://:org_name.sentry.io/issues/:issue_id' or 'https://sentry.io/organizations/:org_id/issues/:issue_id'.");
  }

  const data = parseSentryUrl(issueURL);
  if (data && data.issueId) {
    setExtensionFields(record, {
      isSentry: true,
      issue_id: data.issueId
    });
  }
});
