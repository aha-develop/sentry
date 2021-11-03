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
  auth = async (callBack: () => any = () => {}) => {
    const authData = await aha.auth("sentry", { useCachedRetry: true });
    this.setToken(authData.token);
    return await callBack();
  };

  /**
   * Get Organizations from Sentry
   *
   * @returns
   */
  getOrganizations = async (): Promise<IOrganization[]> => {
    const { data } = await this.get("/organizations/");
    return data;
  };

  /**
   * Get Projects from Sentry
   *
   * @param options
   * @returns
   */
  getProjects = async (options: IGetProjectOptions): Promise<IProject[]> => {
    if (!options.org_slug) {
      return [];
    }
    const { data } = await this.get(`/organizations/${options.org_slug}/projects/`);
    return data;
  };

  /**
   * Get Issues from Sentry
   *
   * @param options
   * @returns
   */
  getIssues = async (options: IGetIssuesOptions): Promise<{ data: IIssue[]; next_page: string | null }> => {
    if (!options?.org_slug || !options?.project_slug) {
      return { data: [], next_page: null };
    }

    const { data } = await this.get(`/projects/${options.org_slug}/${options.project_slug}/issues/`, {
      params: { cursor: options.cursor },
    });

    return { data: data, next_page: "" };
  };

  /**
   * Get a Issue from Sentry
   *
   * @param options
   * @returns
   */
  getIssue = async (issueId: string): Promise<IIssue> => {
    const { data } = await this.get(`/issues/${issueId}/`);

    return data;
  };

  /**
   * Get Latest Event from Sentry
   *
   * @param options
   * @returns
   */
  getLatestEvent = async (options: IGetEventOptions): Promise<IEvent> => {
    if (!options?.issue_id) {
      return null;
    }
    const axiosIns = this.axiosIns;
    const { data } = await axiosIns.get(`/issues/${options.issue_id}/events/latest/`);

    return data;
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

  get = async (...args: Parameters<AxiosInstance["get"]>) => {
    try {
      const data = await this.axiosIns.get(...args);
      return data;
    } catch (err) {
      if ((err.message as string).includes("401")) {
        throw new aha.AuthError(err.message, "sentry");
      } else {
        throw err;
      }
    }
  };
}

export default SentryClient.create();
