import { parseURL } from "@helpers/parseURL";
import { setExtensionFields } from "@helpers/setExtensionFields";
import { validSentryURL } from "@helpers/validSentryURL";

aha.on("addLink", async ({ record, context }) => {
  const issueURL: string = await aha.commandPrompt("Link URL", {
    placeholder: "Enter the Sentry Issue URL",
  });

  if (!validSentryURL(issueURL)) {
    throw new Error("Please enter a valid Sentry URL");
  }

  const res = parseURL(issueURL, "/organizations/:org_id/issues/:issue_id");
  if (res?.issue_id && res?.org_id) {
    setExtensionFields(record, { isSentry: true, issue_id: res?.issue_id });
  }
});
