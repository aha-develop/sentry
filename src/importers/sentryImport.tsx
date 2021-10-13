import React from "react";
import { get } from "lodash";

import sentryClient from "./sentryClient";
import { convertOptions } from "./utils";
import { MAX_RESULTS } from "./config";

const importer = aha.getImporter<IIssue>("aha-develop.sentry-import.sentryImport");

async function authenticate() {
  await sentryClient.auth();
}

/**
 * Returns Filter List
 */
importer.on({ action: "listFilters" }, async (): Promise<Aha.ListFilters> => {
  await authenticate();
  return {
    organization: {
      title: "Organization",
      required: true,
      type: "autocomplete",
    },
    project: {
      title: "Project",
      required: true,
      type: "autocomplete",
    },
  };
});

/**
 * Returns Filter Values
 */
importer.on({ action: "filterValues" }, async ({ filterName, filters }): Promise<Aha.FilterValue[]> => {
  await authenticate();
  switch (filterName) {
    case "organization": {
      const workspaces = await sentryClient.getOrganizations();
      return workspaces.map(convertOptions);
    }
    case "project": {
      const { organization = "" } = filters;
      const projects = await sentryClient.getProjects({ org_slug: organization || "" });
      return projects.map(convertOptions);
    }
  }

  return [];
});

/**
 * Returns Task list for importing
 */
importer.on({ action: "listCandidates" }, async ({ filters, nextPage }) => {
  await authenticate();
  const filterOptions: IGetIssueOptions = {
    org_slug: filters.organization,
    project_slug: filters.project,
    limit: MAX_RESULTS,
    ...(nextPage ? { offset: nextPage } : {}),
    ...(filters.assignee ? { assignee: filters.assignee } : {}),
  };

  const { data: tasks, next_page } = await sentryClient.getIssues(filterOptions);
  return {
    records: tasks.map(({ id, title, ...rest }) => ({
      uniqueId: id,
      name: title,
      id,
      title,
      ...rest,
    })),
    nextPage: next_page,
  };
});

/**
 * Renders Import Record
 */
importer.on({ action: "renderRecord" }, async ({ record, onUnmounted }) => {
  await authenticate();
  return (
    <div>
      <h6>{record?.shortId || ""}</h6>
      <a href={`${record.permalink}`}>{record?.title || ""}</a>
    </div>
  );
});

/**
 * Imports Record
 */
importer.on({ action: "importRecord" }, async ({ importRecord, ahaRecord }) => {
  await authenticate();

  const eventData = await sentryClient.getLatestEvent({ issue_id: importRecord.id });
  const frames: IEventTraceFrame[] = get(eventData, "entries.0.data.values.0.stacktrace.frames", []);
  const stackTraces = frames.map((e: IEventTraceFrame, index: number) => {
    const item = frames[frames.length - 1 - index];

    return `&#9;at ${item?.function || ""} (${item?.filename || ""}:${item?.lineNo}:${item?.colNo})`;
  });

  const details = (importRecord?.title || "") + "\n" + stackTraces.join("\n");

  ahaRecord.description = `
  <p>
    <pre>${details}</pre>
  </p>
  <p>
    <a href='${importRecord.permalink}'>View on Sentry</a>
  </p>` as any;
  await ahaRecord.save();
});
