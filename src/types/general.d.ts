declare interface IToken {
  access_token?: string;
  refresh_token?: string;
}

declare interface AvatarType {
  avatarType: "letter_avatar" | "upload";
  avatarUuid?: string | null;
}
