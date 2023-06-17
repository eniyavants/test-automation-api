import { request } from "@playwright/test";

// Setup header and contextRequest
export async function createHeaders() {
  const contextRequest = await request.newContext();
  return contextRequest;
}

// Query Params to be used in daily weather report
export const dailyWeatherParams = {
  daily: "weathercode,sunrise",
  timezone: "Pacific/Auckland",
};

//Query Params to be used in hourly weather report
export const hourlyWeatherParams = {
  hourly: "weathercode,rain,showers",
  timezone: "Pacific/Auckland",
};
