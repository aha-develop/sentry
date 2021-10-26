import React from "react";
import { useAuth } from "@aha-app/aha-develop-react";
import sentryClient from "@helpers/SentryClient";
import { convertStrToDate } from "@helpers/convertStrToDate";
import AttributeCard from "./AttributeCard";
import AttributeChart from "./AttributeChart";

export type AttributeProps = {
  record: Aha.RecordUnion;
  fields: ISentryFields;
};

const Attribute = ({ fields, record }: AttributeProps) => {
  const { error, authed, fetchData, data, loading } = useAuth(async (authData: any) => {
    sentryClient.setToken(authData?.token ?? "");
    return await sentryClient.getIssue(fields?.issue_id);
  });

  React.useEffect(() => {
    if (authed) {
      fetchData();
    }
  }, [authed]);

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
