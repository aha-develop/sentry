import React from "react";
import { useAuth } from "@aha-app/aha-develop-react";
import sentryClient from "@helpers/SentryClient";
import { convertStrToDate } from "@helpers/convertStrToDate";
import AttributeCard from "./AttributeCard";
import AttributeChart from "./AttributeChart";
import { setExtensionFields } from "@helpers/setExtensionFields";
import { parseURL } from "@helpers/parseURL";
import { runCommand } from "@helpers/runCommand";

export type AttributeProps = {
  record: Aha.RecordUnion;
  fields: ISentryFields;
};

const Attribute = ({ fields, record }: AttributeProps) => {
  const { error, authed, data, loading } = useAuth(
    async (authData: any): Promise<IIssue> => {
      if (!authData?.token || !fields?.issue_id) {
        return undefined;
      }
      sentryClient.setToken(authData?.token ?? "");
      return await sentryClient.getIssue(fields?.issue_id);
    },
    undefined,
    [fields?.issue_id, fields?.isSentry]
  );

  const handleClickAddSentry = async () => {
    runCommand(record, "addLink");
  };

  if (!fields?.isSentry) {
    return (
      <aha-button kind="link" size="medium" type="button" onClick={handleClickAddSentry}>
        Link to Sentry Issue
      </aha-button>
    );
  }

  if (loading) {
    return <aha-spinner />;
  }

  const details = [
    { name: "Events", count: `${data?.count}` ?? "0" },
    { name: "Users", count: `${data?.userCount}` ?? "0" },
    { name: "First seen", count: convertStrToDate(data?.firstSeen) },
    { name: "Last seen", count: convertStrToDate(data?.lastSeen) },
  ];

  return (
    <aha-flex align-items="center" justify-content="space-between" gap="5px">
      {error && <div>{error}</div>}
      {data && (
        <aha-flex direction="column" style={{ width: "100%" }}>
          <aha-flex direction="row" style={{ paddingBottom: "10px" }}>
            <aha-flex direction="column" style={{ flexGrow: 1 }}>
              <h4 style={{ textTransform: "capitalize", fontWeight: "bold" }}>{data?.type ?? ""}</h4>
              <p>{data?.title ?? ""}</p>
            </aha-flex>
            <aha-flex style={{ textTransform: "capitalize" }}>{data?.project?.name ?? ""}</aha-flex>
          </aha-flex>
          <aha-flex direction="row" justify-content="space-between">
            {details.map((e) => (
              <AttributeCard {...e} />
            ))}
          </aha-flex>
          <aha-flex direction="row">
            <AttributeChart stats={data?.stats} />
          </aha-flex>
        </aha-flex>
      )}
    </aha-flex>
  );
};

export default Attribute;
