import React from "react";
import SentryApp from "@components/App";
import Attribute from "@components/Attribute";

aha.on("sentryAttribute", ({ record, fields, onUnmounted }, { identifier, settings }) => {
  return (
    <SentryApp>
      <Attribute fields={fields} record={record} />
    </SentryApp>
  );
});
