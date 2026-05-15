// AQI level colors map directly to EPA breakpoints
export interface AqiColors {
  good: string;
  moderate: string;
  unhealthySensitive: string;
  unhealthy: string;
  veryUnhealthy: string;
  hazardous: string;
  noData: string;
}

export interface Theme {
  accent: {
    primary: string;
    soft: string;
    mist: string;
  };
  surface: {
    appBackground: string;
    htmlBackground: string;
    card: string;
    cardSoft: string;
    tile: string;
    borderSoft: string;
    border: string;
  };
  text: {
    primary: string;
    strong: string;
    muted: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  status: {
    successText: string;
    moderateText: string;
    usgText: string;
    dangerText: string;
  };
  tab: {
    active: string;
    inactive: string;
  };
  aqi: AqiColors;
}

export const theme: Theme = {
  accent: {
    primary: "#0F7A6B",
    soft: "#B9D8D2",
    mist: "#DEF0ED",
  },
  surface: {
    appBackground: "#F5F7F8",
    htmlBackground: "#E9EEF1",
    card: "#FFFFFF",
    cardSoft: "#FAFCFC",
    tile: "#F2F5F6",
    borderSoft: "#EEF1F3",
    border: "#E4EAED",
  },
  text: {
    primary: "#0F2028",
    strong: "#2A3A42",
    muted: "#3A4A52",
    secondary: "#5A6A72",
    tertiary: "#7A8A92",
    inverse: "#FFFFFF",
  },
  status: {
    successText: "#0B3D14",
    moderateText: "#1A1A00",
    usgText: "#2A1400",
    dangerText: "#FFFFFF",
  },
  tab: {
    active: "#0F7A6B",
    inactive: "#7A8A8A",
  },
  aqi: {
    good: "#7ED07A",
    moderate: "#FFE15A",
    unhealthySensitive: "#FF9E4A",
    unhealthy: "#F05A5A",
    veryUnhealthy: "#A16BC7",
    hazardous: "#7E2A3A",
    noData: "#B8C0C5",
  },
};
