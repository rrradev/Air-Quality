import { createGlobalStyle } from 'styled-components';
import pixels from './pixels.png';
import pixelsDark from './pixels_dark.png';

export const lightTheme = {
  backgroundImage: pixels,
  chartBackgroundColor: "white",
  text: "rgb(34, 30, 78)",
  panelColor: "#D9D3DA",
  shadows: "2px 4px 4px 0px rgb(60, 60, 60)"
};

export const darkTheme = {
  backgroundImage: pixelsDark,
  chartBackgroundColor: "#1c252b",
  text: "rgb(200, 200, 200)",
  panelColor: "rgb(54, 54, 73)",
  shadows: "0px 0px 0px 0px"
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${(props) => props.theme.backgroundImage}); 
  }

  .chart-container {
    margin-top: 10px;
    box-shadow: ${(props) => props.theme.shadows};
    background-color: ${(props) => props.theme.chartBackgroundColor};
    height: 300px;
    border-radius: 35px;
  }

  .stat-card {
    box-shadow: ${(props) => props.theme.shadows};
  }

  .title-text {
    color: ${(props) => props.theme.text}
  }

  #panel {
    background-color: ${(props) => props.theme.panelColor}
  }
`;
