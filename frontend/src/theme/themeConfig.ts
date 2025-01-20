export const ColorPalette = {
  fontDark: "#101727",
  fontLight: "#f0f0f0",
  darkMode: "#383838", // TODO: add dark and light mode colors
  lightMode: "#ffffff",
  purple: "#b624ff",
  red: "#ff3131",
  green: "#AFE1AF",
  orange: "#ff9318",
  orangeDark: "#ff9500",
} as const;

export const themeConfig: { [key: string]: { primaryColor: string; secondaryColor?: string } } = {
  Aurora: {
    primaryColor: "#00e952",
    secondaryColor: "#011926",
  },
  Blue: {
    primaryColor: "#2a93d5",
  },
  Purple: {
    // Default dark theme
    primaryColor: ColorPalette.purple,
  },
  "Light Purple": {
    // Default light theme
    primaryColor: ColorPalette.purple,
    secondaryColor: "#edeef6",
  },

  // "Minty Fresh": {
  //   primaryColor: "#26C6DA",
  //   secondaryColor: "#E0F7FA",
  // },
  Pink: {
    primaryColor: "#e5369a",
  },
  "Blush Blossom": {
    primaryColor: "#EC407A",
    secondaryColor: "#FCE4EC",
  },
  // "Ultra Pink": {
  //   primaryColor: "#ff0090",
  //   secondaryColor: "#ff94d1",
  // },

  Cheesecake: {
    primaryColor: "#E14C94",
    secondaryColor: "#FDF0D5",
  },
  "Mystic Coral": {
    primaryColor: "#ff7b9c",
    secondaryColor: "#4a2333",
  },
  "Dark Orange": {
    primaryColor: "#FF5631",
    secondaryColor: "#0D0D0D",
  },
  "Light Orange": {
    primaryColor: "#F26E56",
    secondaryColor: "#F6F6F6",
  },

  // Add new themes here
};
