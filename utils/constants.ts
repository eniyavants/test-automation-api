//Base URL
export const baseURL = "https://api.open-meteo.com";

//Path Params for weather forecast attribute
export const weather_path = "/v1/forecast";

// Latitude and Longitude for Auckland
export const aucklandLat = -36.875;
export const aucklandLon = 174.75;

// Latitude and Longitude for Wellington
export const wellingtonLat = -41.125;
export const wellingtonLon = 174.875;

//Validation Data for Latitude
export const latValidationData = {
  1234567: "Latitude must be in range of -90 to 90°",
  testString: "Value of type 'Float' required for key 'latitude'.",
  '': "Value of type 'Float' required for key 'latitude'.",
};

//Validation Data for Longitude
export const lonValidationData = {
  1234567: "Longitude must be in range of -180 to 180°",
  testString: "Value of type 'Float' required for key 'longitude'.",
  '': "Value of type 'Float' required for key 'longitude'.",
};
