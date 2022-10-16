import {
  Box,
  Collapse,
  createStyles,
  Group,
  NavLink as DsNavLink,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import type { NavbarMenu } from "~/components/layout/NavbarLinkList";
import { IconChevronRight } from "@tabler/icons";
import { useNavbarLinkDispatch } from "~/components/layout/context/navbar-link";
import { useEffect } from "react";
import { useFirstMountState } from "react-use";
import { NavLink } from "@remix-run/react";

export function NavbarLinkItem({
  icon,
  label,
  subLinks,
  initiallyOpened,
}: NavbarMenu) {
  const { onChangeOpenedLabels, onCheckIfOpenedLabel } =
    useNavbarLinkDispatch();
  const isFirstMount = useFirstMountState();
  const { classes } = useStyles();

  const openInitialLabelWhenFirstRender = () => {
    if (!isFirstMount) {
      return;
    }

    if (!initiallyOpened) {
      return;
    }

    onChangeOpenedLabels(label);
  };

  useEffect(() => {
    openInitialLabelWhenFirstRender();
  }, []);

  const hasLinks = Array.isArray(subLinks);
  const isOpened = onCheckIfOpenedLabel(label);

  return (
    <>
      <UnstyledButton
        onClick={() => onChangeOpenedLabels(label)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              {icon}
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: isOpened ? `rotate(90deg)` : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && (
        <Collapse in={isOpened}>
          {subLinks.map((subLink) => (
            <DsNavLink
              component={NavLink}
              to={subLink.link}
              className={classes.link}
              key={subLink.label}
              label={subLink.label}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));
