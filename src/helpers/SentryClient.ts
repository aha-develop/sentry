import { AxiosInstance } from "axios";
import axios from "./axios";
import { MAX_RETRY_COUNT } from "./config";

/**
 * @class Sentry API Manager
 */
class SentryClient {
  static _instance: SentryClient;

  /**
   * Create SentryClient Instance
   *
   * @param token
   * @returns
   */
  static create = (): SentryClient => {
    if (!SentryClient._instance) {
      SentryClient._instance = new SentryClient();
    }
    return SentryClient._instance;
  };

  /**
   * Create Axios Instance
   *
   * @param token
   */
  setToken = (token: string) => {
    this.axiosIns = axios(token);
  };

  retryCount = 0;
  axiosIns: AxiosInstance;
  constructor() {}

  /**
   * When authentication failed
   *
   * @param callBack
   * @returns
   */
  auth = async (reAuth = false, callBack: () => any = () => {}) => {
    if (this.axiosIns && !reAuth) {
      return;
    }

    let options = {};
    if (!reAuth) {
      options = { useCachedRetry: true, reAuth: false };
    }

    const authData = await aha.auth("sentry", options);
    this.setToken(authData.token);
    return await callBack();
  };

  /**
   * Get Organizations from Sentry
   *
   * @returns
   */
  getOrganizations = async (): Promise<IOrganization[]> => {
    try {
      const { data } = await this.axiosIns.get("/organizations/");
      return data;
    } catch (error) {
      this.log("Could not get Organizations", error);
      if (!this.checkRetry(error)) {
        return;
      }
      this.retryCount++;
      return await this.auth(true, async () => await this.getOrganizations());
    }
  };

  /**
   * Get Projects from Sentry
   *
   * @param options
   * @returns
   */
  getProjects = async (options: IGetProjectOptions): Promise<IProject[]> => {
    try {
      if (!options.org_slug) {
        return [];
      }
      const { data } = await this.axiosIns.get(`/organizations/${options.org_slug}/projects/`);
      return data;
    } catch (error) {
      this.log("Could not get Projects", error);
      if (!this.checkRetry(error)) {
        return;
      }
      return await this.auth(true, async () => await this.getProjects(options));
    }
  };

  /**
   * Get Issues from Sentry
   *
   * @param options
   * @returns
   */
  getIssues = async (options: IGetIssuesOptions): Promise<{ data: IIssue[]; next_page: string | null }> => {
    try {
      if (!options?.org_slug || !options?.project_slug) {
        return { data: [], next_page: null };
      }

      const { data } = await this.axiosIns.get(`/projects/${options.org_slug}/${options.project_slug}/issues/`, {
        params: { cursor: options.cursor },
      });

      return { data: data, next_page: "" };
    } catch (error) {
      this.log("Could not get Issues", error);
      if (!this.checkRetry(error)) {
        return;
      }
      return await this.auth(true, async () => await this.getIssues(options));
    }
  };

  /**
   * Get a Issue from Sentry
   *
   * @param options
   * @returns
   */
  getIssue = async (issueId: string): Promise<IIssue> => {
    try {
      const { data } = await this.axiosIns.get(`/issues/${issueId}/`);

      return data;
    } catch (error) {
      this.log("Could not get an issue", error.message);
      if (!this.checkRetry(error)) {
        return;
      }
      return await this.auth(true, async () => await this.getIssue(issueId));
    }
  };

  /**
   * Get Latest Event from Sentry
   *
   * @param options
   * @returns
   */
  getLatestEvent = async (options: IGetEventOptions): Promise<IEvent> => {
    try {
      if (!options?.issue_id) {
        return null;
      }
      const axiosIns = this.axiosIns;
      const { data } = await axiosIns.get(`/issues/${options.issue_id}/events/latest/`);

      return data;
    } catch (error) {
      this.log("Could not get Latest Event", error);
      if (!this.checkRetry(error)) {
        return;
      }
      return await this.auth(true, async () => await this.getLatestEvent(options));
    }
  };

  /**
   * Error Log
   *
   * @param msg
   * @param error
   */
  log = (msg, error) => {
    console.log(`[Error in Sentry API Call] => `, msg, error);
  };

  /**
   * Auth Retry
   *
   * @returns
   */
  checkRetry = (err: any) => {
    if (this.retryCount >= MAX_RETRY_COUNT || err?.response?.status !== 401) {
      this.retryCount === 0;
      return false;
    }
    this.retryCount++;
    return true;
  };
}

export default SentryClient.create();
