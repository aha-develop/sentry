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
  const { error, authed, data, loading, fetchData } = useAuth(
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
    <aha-flex align-items="center" direction="row" gap="5px">
      {error && !data && (
        <div>
          {error}
          <br />
          <br />
          <aha-button kind="primary" type="button" onClick={() => fetchData()}>
            Authenticate
          </aha-button>
        </div>
      )}
      {data && (
        <aha-flex direction="column" gap="20px" style={{ width: "calc(100% - 42px)", border: "1px solid var(--theme-primary-border)", borderRadius: 4, padding: 20 }}>
          <aha-flex direction="column">
            <aha-flex direction="row" justify-content="space-between">
              <h4 style={{ textTransform: "capitalize", fontWeight: "bold" }}>{data?.metadata?.type ?? ""}</h4>
              <strong style={{ fontSize: '12px', textTransform: "uppercase" }}>{data?.shortId ?? ""}</strong>
            </aha-flex>
            <div style={{ fontSize: 12, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{data?.metadata?.value ?? ""}</div>
          </aha-flex>

          <aha-flex direction="row" justify-content="space-between" gap="10px">
            {details.map((e) => (
              <AttributeCard {...e} />
            ))}
          </aha-flex>

          <aha-flex direction="row" justify-content="stretch">
            <AttributeChart stats={data?.stats} />
          </aha-flex>

          <aha-flex direction="row" justify-content="flex-end">
            <aha-button kind="secondary" href={data.permalink} size="mini">
              View in Sentry
            </aha-button>
          </aha-flex>

        </aha-flex>
      )}
    </aha-flex>
  );
};

export default Attribute;
