declare interface IToken {
  access_token?: string;
  refresh_token?: string;
}

declare interface AvatarType {
  avatarType: "letter_avatar" | "upload";
  avatarUuid?: string | null;
}

declare type IAhaReferenceType = "Epic" | "Feature" | "Requirement";

declare type ISentryResource = "issue" | "error";

declare interface ISentryFields {
  issue_id?: string;
  isSentry?: boolean;
  count?: number;
  userCount?: number;
  firstSeen?: string;
  lastSeen?: string;
  stats?: ISentryStats;
}
