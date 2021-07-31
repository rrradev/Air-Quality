import { createGlobalStyle } from 'styled-components';
import pixels from './pixels.png';
import pixelsDark from './pixels_dark.png';

export const lightTheme = {
  backgroundImage: pixels,
  chartBackgroundColor: "white",
  titleText: "rgb(34, 30, 30)"
};

export const darkTheme = {
  backgroundImage: pixelsDark,
  chartBackgroundColor: "#1c252b",
  titleText: "rgb(245, 233, 233)"
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${(props) => props.theme.backgroundImage}); 
  }

  .chart-container {
    margin-top: 10px;
    box-shadow: 0px -2px 5px 0px rgb(56, 52, 52);
    background-color: ${(props) => props.theme.chartBackgroundColor};
    height: 300px;
  }

  .title-text {
    color: ${(props) => props.theme.titleText}
  }
`;
