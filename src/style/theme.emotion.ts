export const theme = {
  colorPrimary500: "#ee0979",
  colorNeutral900: "#000000",
  colorNeutral800: "#1f2937",
  colorNeutral700: "#4b5563",
  colorNeutral500: "#5e5e5e",
  colorNeutral200: "#e5e7eb",
  colorNeutral100: "#ffffff",
  colorTransparent600: "rgba(0, 0, 0, 0.6)",
  colorTransparent400: "rgba(0, 0, 0, 0.4)",
  colorTransparent100: "rgba(0, 0, 0, 0.1)",
} as const;

declare module "@emotion/react" {
  export interface Theme {
    colorPrimary500: string;
    colorNeutral900: string;
    colorNeutral800: string;
    colorNeutral700: string;
    colorNeutral500: string;
    colorNeutral200: string;
    colorNeutral100: string;
    colorTransparent600: string;
    colorTransparent400: string;
    colorTransparent100: string;
  }
}
