import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  Cloudy,
  Snowflake,
  Sun,
  SunDim,
} from "lucide-react";

const iconComponents = {
  Sun,
  SunDim,
  Cloud,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudHail,
  Snowflake,
  CloudLightning,
};

type WeatherCode = {
  text: string;
  icon: keyof typeof iconComponents;
  color: string;
};

const weatherCodes: { [key: number]: WeatherCode } = {
  0: { text: "Clear", icon: "Sun", color: "#FFB300" },
  1: { text: "Mainly clear", icon: "SunDim", color: "#FFC107" },
  2: { text: "Partly cloudy", icon: "Cloud", color: "#90CAF9" },
  3: { text: "Overcast", icon: "Cloudy", color: "#64B5F6" },
  45: { text: "Fog", icon: "CloudFog", color: "#B0BEC5" },
  48: { text: "Rime fog", icon: "CloudFog", color: "#90A4AE" },
  51: { text: "Light drizzle", icon: "CloudDrizzle", color: "#81D4FA" },
  53: { text: "Moderate drizzle", icon: "CloudDrizzle", color: "#4FC3F7" },
  55: { text: "Dense drizzle", icon: "CloudDrizzle", color: "#29B6F6" },
  56: { text: "Light freezing drizzle", icon: "CloudSnow", color: "#B3E5FC" },
  57: { text: "Dense freezing drizzle", icon: "CloudSnow", color: "#81D4FA" },
  61: { text: "Light rain", icon: "CloudRain", color: "#4DD0E1" },
  63: { text: "Moderate rain", icon: "CloudRain", color: "#26C6DA" },
  65: { text: "Heavy rain", icon: "CloudRainWind", color: "#00ACC1" },
  66: { text: "Light freezing rain", icon: "CloudHail", color: "#80DEEA" },
  67: { text: "Heavy freezing rain", icon: "CloudHail", color: "#26C6DA" },
  71: { text: "Light snow", icon: "CloudSnow", color: "#E0F7FA" },
  73: { text: "Moderate snow", icon: "CloudSnow", color: "#B2EBF2" },
  75: { text: "Heavy snow", icon: "CloudSnow", color: "#80DEEA" },
  77: { text: "Snow grains", icon: "Snowflake", color: "#B2EBF2" },
  80: { text: "Light rain showers", icon: "CloudRain", color: "#4FC3F7" },
  81: { text: "Moderate rain showers", icon: "CloudRain", color: "#29B6F6" },
  82: { text: "Violent rain showers", icon: "CloudRainWind", color: "#0288D1" },
  85: { text: "Light snow showers", icon: "CloudSnow", color: "#B3E5FC" },
  86: { text: "Heavy snow showers", icon: "CloudSnow", color: "#81D4FA" },
  95: { text: "Thunderstorm", icon: "CloudLightning", color: "#7E57C2" },
  96: {
    text: "Thunderstorm with light hail",
    icon: "CloudLightning",
    color: "#5E35B1",
  },
  99: {
    text: "Thunderstorm with heavy hail",
    icon: "CloudLightning",
    color: "#4527A0",
  },
};

export const WeatherIcon = (code: number) => {
  const weather = weatherCodes[code];
  const IconComponent = iconComponents[weather.icon];

  return <IconComponent size={35} color={weather.color} />;
};

export const WeatherText = (code: number) => {
  return weatherCodes[code].text;
};
