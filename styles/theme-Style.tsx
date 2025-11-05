// Light Theme 스타일
const lightTheme: ITheme = {
  backgroundColor: "#f8f8f8",
  color: "#080808",
  primary: "#00bcd4",
  secondary: "#6c6c6c",
  accent: "#3d3d3d",
  invert: "#000000",
};
// Dark Theme 스타일
const darkTheme: ITheme = {
  backgroundColor: "#333333",
  color: "#fafafa",
  primary: "#00bcd4",
  secondary: "#6c6c6c",
  accent: "#3d3d3d",
  invert: "#000000",
};

// theme style interface
export interface ITheme {
  backgroundColor: string;
  color: string;
  primary: string;
  secondary: string;
  accent: string;
  invert: string;
}

// 테마 관련된 스타일
export const themeStyle = {
  lightTheme,
  darkTheme,
};
