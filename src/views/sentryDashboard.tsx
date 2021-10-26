import React from "react";

const Styles = () => {
  return (
    <style>
      {`
        .title {
          color: var(--aha-green-800);
          font-size: 20px;
          text-align: center;
          margin: 20px;
        }
      `}
    </style>
  );
};

aha.on("sentryDashboard", ({ fields, onUnmounted }, { identifier, settings }) => {
  return (
    <>
      <Styles />
      <div className="title">Sentry Dashboard</div>
    </>
  );
});
