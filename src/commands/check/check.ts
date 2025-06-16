import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { ExecutionContext } from "../../execution-context/execution-context";
import { checkLangfuse } from "./check-04-langfuse";
import { checkOpenAIKey } from "./check-01-openai-key";
import { checkOpenAIModel } from "./check-02-openai-model";
import { checkOpenAIRateLimit } from "./check-03-openai-rate-limit";
import { checkConnection } from "./check-00-connection";
import { checkBaseURL } from "./check-01-base-url";

export async function check(executionContext: ExecutionContext) {
  const interactive = executionContext.isTTYstdin;
  const provider = executionContext.provider;

  //  Create the OpenAI instance we'll use for a lot of the rest of the checks.
  const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
  let agent;
  if (proxyUrl) {
    agent = new HttpsProxyAgent(proxyUrl);
  } else {
    console.log("未检测到 HTTPS_PROXY 环境变量，未启用代理");
  }
  const openai = new OpenAI({
    apiKey: executionContext.provider.apiKey,
    baseURL: executionContext.provider.baseURL,
    ...(agent ? { httpAgent: agent, httpsAgent: agent } : {}),
  });

  await checkConnection(interactive);
  await checkBaseURL(interactive, provider.baseURL);
  await checkOpenAIKey(interactive, openai, provider.apiKey);
  await checkOpenAIModel(interactive, openai, provider.model);
  await checkOpenAIRateLimit(interactive, openai, provider.model);

  await checkLangfuse(executionContext);
}
