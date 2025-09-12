import { IDENTIFIER } from "./config";

type FilterPayloadKey = "issue_id" | "web_url" | "api_url" | "user" | "event_id" | "issue_url" | "title";

export class WebhookMgr {
  /**
   * Handles Webhook
   *
   * @param headers
   * @param payload
   */
  static webhookHandler = async ({ headers, payload }, { identifier, settings }) => {
    console.log(`===== Received Sentry Issues ${identifier} =====`);
    const { HTTP_SENTRY_HOOK_RESOURCE: resource } = headers;

    switch (resource) {
      case "issue": {
        const instance = new WebhookMgr(resource, payload, identifier);
        if (payload?.action === "created") {
          await instance.save();
        }
        break;
      }
      default:
        break;
    }
  };

  constructor(private resource: ISentryResource, private payload: any, private identifier = IDENTIFIER) {}

  save = async () => {
    try {
      const issue_id = this.filterPayload("issue_id");
      const record = new aha.models["Feature"]();
      const title = this.filterPayload("title");
      record.name = title;
      record.description = `
      <p>
        <pre>${title}</pre>
      </p>
      <p>
        <a href='${this.filterPayload("issue_url")}}'>View in Sentry</a>
      </p>` as any;
      record.setExtensionField(this.identifier, "issue_id", issue_id);
      record.setExtensionField(this.identifier, "isSentry", true);
      await record.save();
    } catch (error) {
      console.log("[===== Error in WebhookMgr =====]", error.message);
    }
  };

  getReferenceNum = () => {
    if (this.resource === "issue") {
      return;
    } else if (this.resource === "error") {
      const issueURL = this.filterPayload("issue_url");
    }
  };

  filterPayload = (...keys: FilterPayloadKey[]) => {
    const data = keys.reduce((acc, key) => {
      switch (key) {
        case "api_url":
          acc[key] = this.getProp(this.payload, `${this.resource}.url`);
          break;
        case "issue_id":
          acc[key] = this.getProp(this.payload, `issue.id`);
          break;
        default:
          acc[key] = this.getProp(this.payload, `${this.resource}.${key}`);
          break;
      }
      return acc;
    }, {});
    return keys.length === 1 ? data[keys[0]] : data;
  };

  // Safely access nested properties using dot paths (e.g., "issue.id")
  private getProp = (obj: any, path: string) => {
    if (!obj || !path) return undefined;
    return path.split(".").reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), obj);
  };
}
