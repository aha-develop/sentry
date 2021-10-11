declare interface IUser {
  gid: string;
  resource_type: "user";
  name: string;
}

declare interface IGetUserOptions {
  workspace: string;
}
