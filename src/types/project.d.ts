declare interface IProject {
  id: string;
  slug: string;
  name: string;
  avatar?: AvatarType;
  color?: string;
  dateCreated?: string;
  features?: string[];
  firstEvent?: string;
  firstTransactionEvent?: boolean;
  hasAccess?: boolean;
  hasSessions?: boolean;
  isBookmarked?: boolean;
  isInternal?: boolean;
  isMember?: boolean;
  isPublic?: boolean;
  organization?: IOrganization;
  platform?: string;
  status?: string;
}

declare interface IGetProjectOptions {
  org_slug: string;
}
