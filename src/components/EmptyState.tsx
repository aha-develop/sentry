import React, { useState } from "react";
import { ValidationMessage, parseSentryUrl, validSentryURL } from "@helpers/sentryURLs";
import { setExtensionFields } from "@helpers/setExtensionFields";


export const EmptyState: React.FC<{ record: Aha.RecordUnion }> = ({
  record,
}) => {
  const [validation, setValidation] = useState<String | null>(null);

  const pasteLink = async (url: string) => {
    if (!url) {
      setValidation('')
      return;
    }

    if (!validSentryURL(url)) {
      setValidation(ValidationMessage);
      return;
    }

    const data = parseSentryUrl(url)
    if (data && data.issueId) {
      setExtensionFields(record, {
        isSentry: true,
        issue_id: data.issueId
      });
    } else {
      setValidation("Could not extract issue details");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="https://organization.sentry.io/issues/..."
        style={{
          display: "block",
          width: "calc(100% - 16px)",
          marginBottom: 0,
        }}
        onChange={(e) => pasteLink(e.target.value)}
      />
      {validation}
    </>
  );
};