import axios from "axios";
import { getPersonalId, getSessionInfo, getUserInfo } from "./AuthUtils";
import { ENV_VAR } from "./EnvVariables";

export const BASE_URL = ENV_VAR.API_URI;

// axios.interceptors.request.use(
//   (config) => {
//     config.headers["sessionId"] = getSessionInfo();
//     config.headers["userId"] = getUserInfo("userId");
//     config.headers["personalId"] = getPersonalId();
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

export async function CallApiGet(argApiName: string) {
  try {
    console.log("======== Call API GET =========", ENV_VAR.API_URI);
    //======== Call API GET =========
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = await axios.get(apiUrl);
    PostApiCallHandler(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
}

export async function CallApiPost(argApiName: string, argData: any) {
  try {
    //======== Call API POST =========
    console.log(
      "======== Call API POST =========",
      ENV_VAR.API_URI + "/" + argApiName,
      argData
    );
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = await axios.post(apiUrl, argData);
    PostApiCallHandler(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
}

export const CallApiPut = async (argApiName: string, argData: any) => {
  try {
    //======== Call API PUT =========
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = await axios.put(apiUrl, argData);
    PostApiCallHandler(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
};

export const CallApiDelete = async (argApiName: string) => {
  try {
    //======== Call API DELETE =========
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = await axios.delete(apiUrl);
    PostApiCallHandler(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
};

export const CallApiFetch = async (argApiName: string) => {
  try {
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = fetch(apiUrl, {
      method: "GET",
      headers: {
        sessionId: getSessionInfo(),
        userId: getUserInfo("userId"),
        personalId: getPersonalId(),
      },
    });
    return resp;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
};

export const PostApiCallHandler = (resp: any) => {
  if (resp.respCode === 403) {
    localStorage.clear();
    navigateToPage("/login");
  }
};

export const navigateToPage = (argPageUrl: string) => {
  window.location.href = argPageUrl;
};

export async function CallApiGetWithHead(argApiName: string) {
  try {
    //======== Call API GET =========
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = await axios.get(apiUrl, { responseType: "blob" });
    PostApiCallHandler(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
}

export async function CallApiPostWithHead(argApiName: string, argData: any) {
  try {
    //======== Call API POST =========
    console.log("======== Call API POST =========", ENV_VAR.API_URI);
    const apiUrl = ENV_VAR.API_URI + "/" + argApiName;
    const resp = await axios.post(apiUrl, argData, { responseType: "blob" });
    PostApiCallHandler(resp);
    return resp;
  } catch (error) {
    console.error(error);
    return { respCode: 99, respMessage: error, respData: "" };
  }
}

export const ReactVersion = process.env.REACT_APP_VERSION;
