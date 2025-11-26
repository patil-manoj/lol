// Color palette matching the frontend design
export const colors = {
  // Terra Cotta shades
  terra: {
    50: "#FEF5F0",
    100: "#FCEAD9",
    200: "#F9D5B3",
    300: "#F5C08C",
    400: "#E89D64",
    500: "#D97642",
    600: "#C25E3F",
    700: "#9F4B32",
    800: "#7C3A27",
    900: "#5A2A1C",
  },

  // Olive shades
  olive: {
    50: "#F5F7F3",
    100: "#E8EDE4",
    200: "#D1DBC9",
    300: "#B9C9AE",
    400: "#9BAA8B",
    500: "#6D7D62",
    600: "#56624A",
    700: "#454F3C",
    800: "#353D2E",
    900: "#252B21",
  },

  // Sand/Cream shades
  sand: {
    50: "#FFFAF5",
    100: "#FFF8F0",
    200: "#F4EBD9",
    300: "#E8DEC7",
    400: "#DCD0B5",
    500: "#CFC2A3",
    600: "#B8A88A",
    700: "#9B8B71",
    800: "#7D6E58",
    900: "#605440",
  },

  // Neutral shades
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // System colors
  white: "#FFFFFF",
  black: "#000000",

  // Status colors
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
};

export const gradients = {
  terraPrimary: ["#D97642", "#C25E3F"] as const,
  terraSecondary: ["#E89D64", "#D97642"] as const,
  olivePrimary: ["#6D7D62", "#56624A"] as const,
  oliveSecondary: ["#9BAA8B", "#6D7D62"] as const,
  terraBold: ["#D97642", "#56624A"] as const,
  heroBg: ["#D97642", "#C25E3F", "#56624A"] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  organic: 28,
  organicLg: 32,
  round: 9999,
};

export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    semibold: "System",
    bold: "System",
  },
  fontSize: {
    xs: 12,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
};
