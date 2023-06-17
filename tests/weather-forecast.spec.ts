import { test, expect, APIRequestContext } from "@playwright/test";
import {
  dailyWeatherParams,
  hourlyWeatherParams,
  createHeaders,
} from "../utils/helpers/createHeaders";
import {
  aucklandLat,
  aucklandLon,
  baseURL,
  weather_path,
  wellingtonLat,
  wellingtonLon,
  latValidationData,
  lonValidationData
} from "../utils/constants";

test.describe("To get wellington weather forecast", async () => {
  let headers: APIRequestContext;
  let url = baseURL + weather_path;

  test.beforeEach(async () => {
    headers = await createHeaders();
  });

  /**
   * Desc - To get daily weather information for Wellington.
   * API End point - v1/forecast
   * Params - Latitude, Longitude, Daily Weather Variables, timezone are provided in query params
   * HTTP Method - GET
   * Response - 200, JSON containing weather data for 7 days
   */
  test("Get daily weather forecast for Wellington, New Zealand", async ({
    request,
  }) => {
    const response = await request.get(
      url + "?latitude=" + wellingtonLat + "&longitude=" + wellingtonLon,
      {
        params: dailyWeatherParams,
      }
    );
    await expect(response.status()).toBe(200);
    const responseData = await response.json();

    //Assertion
    await expect(responseData.latitude).toBe(wellingtonLat);
    await expect(responseData.longitude).toBe(wellingtonLon);
    await expect(responseData.timezone).toContain("Pacific/Auckland");
    await expect(responseData.generationtime_ms).toBeTruthy();

    await expect(responseData.daily_units).toHaveProperty("time");
    await expect(responseData.daily_units).toHaveProperty("weathercode");
    await expect(responseData.daily_units).toHaveProperty("sunrise");

    await expect(responseData.daily.time).toHaveLength(7);
    await expect(responseData.daily.weathercode).toHaveLength(7);
    await expect(responseData.daily.sunrise).toHaveLength(7);
  });

  /**
   * Desc - To get hourly weather forecast for Wellington.
   * API End point - v1/forecast
   * Params - Latitude, Longitude, Hourly Weather Variables, timezone are provided in query params
   * HTTP Method - GET
   * Response - 200, JSON containing weather data for 7 days
   */
  test("Get hourly weather forecast for Wellington, New Zealand", async ({
    request,
  }) => {
    const response = await request.get(
      url + "?latitude=" + wellingtonLat + "&longitude=" + wellingtonLon,
      {
        params: hourlyWeatherParams,
      }
    );
    await expect(response.status()).toBe(200);
    const responseData = await response.json();

    //Assertion
    await expect(responseData.latitude).toBe(wellingtonLat);
    await expect(responseData.longitude).toBe(wellingtonLon);
    await expect(responseData.timezone).toContain("Pacific/Auckland");

    await expect(responseData.hourly_units.time).toBe("iso8601");
    await expect(responseData.hourly_units.weathercode).toBe("wmo code");
    await expect(responseData.hourly_units.rain).toBe("mm");
    await expect(responseData.hourly_units.showers).toBe("mm");

    await expect(responseData.hourly.time).toHaveLength(168);
    await expect(responseData.hourly.weathercode).toHaveLength(168);
    await expect(responseData.hourly.rain).toHaveLength(168);
    await expect(responseData.hourly.showers).toHaveLength(168);
  });

  /**
   * Negative scenario to validate latitude field.
   * Input - Invalid data
   * Output - 400 Status, Error Reason
   */
  for (const [value, message] of Object.entries(latValidationData)) {
    test(`Error message is returned for invalid latitude value - ${value}`, async ({
      request,
    }) => {
      const response = await request.get(
        url + "?latitude=" + `${value}` + "&longitude=" + aucklandLon,
        {
          params: {
            daily: "weathercode,sunrise",
          },
        }
      );
      await expect(response.status()).toBe(400);
      const responseData = await response.json();
      //Assertion
      await expect(responseData.error).toBeTruthy();
      await expect(responseData.reason).toContain(`${message}`);
    });
  }

  /**
   * Negative scenario to validate longitude field.
   * Input - Invalid data
   * Output - 400 Status, Error Reason
   */
  for (const [value, message] of Object.entries(lonValidationData)) {
    test(`Error message is returned for invalid longitude value - ${value}`, async ({
      request,
    }) => {
      const response = await request.get(
        url + "?latitude=" + aucklandLat + "&longitude=" + `${value}`,
        {
          params: {
            daily: "weathercode,sunrise",
          },
        }
      );
      await expect(response.status()).toBe(400);
      const responseData = await response.json();
      //Assertion
      await expect(responseData.error).toBeTruthy();
      await expect(responseData.reason).toContain(`${message}`);
    });
  }
});

test.describe("To get auckland weather forecast", async () => {
  let headers: APIRequestContext;
  let url = baseURL + weather_path;

  test.beforeEach(async () => {
    headers = await createHeaders();
  });

  /**
   * To validate Timezone is mandatory parameter for daily weather forecast
   * Params - Latitude, Longitude, Daily Weather Variables are provided in query params
   * HTTP Method - GET
   * Response - 400, error and reason
   */
  test("Validate Timezone is mandatory parameter for daily weather forecast", async ({
    request,
  }) => {
    const response = await request.get(
      url + "?latitude=" + aucklandLat + "&longitude=" + aucklandLon,
      {
        params: {
          daily: "weathercode,sunrise",
        },
      }
    );
    await expect(response.status()).toBe(400);
    const responseData = await response.json();

    //Assertion
    await expect(responseData.error).toBeTruthy();
    await expect(responseData.reason).toBe("Timezone is required");
  });
});
