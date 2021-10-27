import React from "react";
import SentryApp from "@components/App";
import Attribute from "@components/Attribute";

aha.on("sentryAttribute", ({ record, fields, onUnmounted }, { identifier, settings }) => {
  console.log("=== record, fields", record, fields);
  onUnmounted(() => {
    console.log("Un-mounting component for", record.identifier);
  });

  return (
    <SentryApp>
      <Attribute fields={fields} record={record} />
    </SentryApp>
  );
});
