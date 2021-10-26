import { AuthProvider } from "@aha-app/aha-develop-react";
import React from "react";

export const SentryApp = ({ children }) => {
  return (
    <AuthProvider serviceName="sentry" serviceParameters={undefined}>
      {children}
    </AuthProvider>
  );
};

export default SentryApp;
