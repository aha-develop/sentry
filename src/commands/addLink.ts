import { setExtensionFields } from "@helpers/setExtensionFields";
import { validSentryURL, parseSentryUrl, ValidationMessage } from "@helpers/sentryURLs";

aha.on("addLink", async ({ record }) => {
  const issueURL: string = await aha.commandPrompt("Link URL", {
    placeholder: "Enter the Sentry issue URL",
  });

  if (!validSentryURL(issueURL)) {
    throw new Error(ValidationMessage);
  }

  const data = parseSentryUrl(issueURL);
  if (data && data.issueId) {
    setExtensionFields(record, {
      isSentry: true,
      issue_id: data.issueId
    });
  }
});
