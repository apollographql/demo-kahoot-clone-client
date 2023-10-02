import { extendTheme, defineStyleConfig } from "@chakra-ui/react";

const colors = {
  orange: {
    500: "#FC5200",
  },
  purple: {
    500: "#7E00FC",
  },
  brand: {
    summit: "#7E00FC",
    horizon: "#FC5200",
    ocean: "#CFEEF3",
    regolith: "#FFEADB",
    sun: "#FFD044",
  },
};

const Link = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    color: "purple.600",
    fontWeight: 500,
  },
});

const fonts = {
  heading: `'Onest', sans-serif`,
  body: `'Onest', sans-serif`,
};

export const theme = extendTheme({ colors, fonts, components: { Link } });
