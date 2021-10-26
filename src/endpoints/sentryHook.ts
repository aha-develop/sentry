import { WebhookMgr } from "@helpers/WebhookMgr";

aha.on("sentryIssues", WebhookMgr.webhookHandler);
