import { createStyles } from "@mantine/core";
import { getMediaScreen, mediaQueries } from "~/fixtures/styles/mediaQuery";

export const useCardStyles = () => {
  return createStyles((theme) => ({
    wrapper: {
      padding: theme.spacing.lg,
      boxShadow: theme.shadows.sm,
      border: `1px solid ${
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
      }`,
    },
    subCardWrapper: {
      width: "33.3333%",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 700,
      fontSize: "20px",
      background: theme.fn.linearGradient(45, "#4c6ef5", "#15aabf"),
      [getMediaScreen(mediaQueries.tablet)]: {
        width: "100%",
        height: "100px",
      },
    },
  }))();
};
