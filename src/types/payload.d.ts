declare interface IPayloadDataBase {
  url: string; // api url
  web_url: string; // web url
}

declare interface IIssuePayloadDetail extends IPayloadDataBase {
  id: string; // issue id
  project_url: string; // project url
}
