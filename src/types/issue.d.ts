declare interface IIssueMetadata {
  title?: string;
  filename?: string;
  function?: string;
  type?: string;
  value?: string;
}

declare interface IIssue extends Aha.ImportRecord {
  id: string;
  title: string;
  project: IProject;
  metadata: IIssueMetadata;
  permalink: string;
  annotations?: any[];
  assignedTo?: any;
  count?: string;
  culprit?: string;
  firstSeen?: string;
  hasSeen?: boolean;
  isBookmarked?: boolean;
  isPublic?: boolean;
  isSubscribed?: boolean;
  lastSeen?: string;
  level?: string;
  logger?: string;
  numComments?: number;
  shareId: null;
  shortId?: string;
  stats?: ISentryStats;
  status?: string;
  statusDetails?: any;
  subscriptionDetails?: string;
  type?: string;
  userCount?: number;
}

declare type ISentryStatsDetail = Array<number>;

declare interface ISentryStats {
  "24h": ISentryStatsDetail[];
  "30d": ISentryStatsDetail[];
}

declare interface IGetIssuesOptions {
  org_slug: string;
  project_slug?: string;
  limit?: number;
  cursor?: string;
}
