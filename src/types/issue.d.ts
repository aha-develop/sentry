declare interface IIssueMetadata {
  title?: string;
  filename?: string;
  function?: string;
  type?: string;
  value?: string;
}

declare interface IIssue {
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
  stats?: any;
  status?: string;
  statusDetails?: any;
  subscriptionDetails?: string;
  type?: string;
  userCount?: number;
}

declare interface IGetIssueOptions {
  org_slug: string;
  project_slug?: string;
  limit?: number;
  cursor?: string;
}
