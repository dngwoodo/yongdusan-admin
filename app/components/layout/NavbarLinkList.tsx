import {
  IconDatabase,
  IconGauge,
  IconSunHigh,
  IconUserPlus,
} from "@tabler/icons";
import { NavbarLinkItem } from "~/components/layout/NavbarLinkItem";
import type { ReactNode } from "react";
import { createStyles } from "@mantine/core";

export default function NavbarLinkList() {
  const { classes } = useStyles();

  return (
    <div className={classes.linksInner}>
      {links.map(({ icon, label, subLinks, initiallyOpened }) => (
        <NavbarLinkItem
          key={label}
          icon={icon}
          label={label}
          subLinks={subLinks}
          initiallyOpened={initiallyOpened}
        />
      ))}
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export type NavbarMenu = {
  label: string;
  icon: ReactNode;
  initiallyOpened?: boolean;
  subLinks?: { label: string; link: string }[];
};

const links: NavbarMenu[] = [
  {
    label: "방문객 데이터",
    icon: <IconUserPlus />,
    subLinks: [
      { label: "방문객 현황", link: "/visitor" },
      { label: "어플리케이션 사용자 현황", link: "/application" },
    ],
  },
  {
    label: "환경데이터",
    icon: <IconSunHigh />,
    initiallyOpened: true,
    subLinks: [
      { label: "실시간 날씨정보", link: "/weather" },
      { label: "상세 날씨정보 조회", link: "/period-weather" },
    ],
  },
  {
    label: "콘텐츠운용현황",
    icon: <IconDatabase />,
    subLinks: [
      { label: "챗봇 (키오스크)", link: "/chat-bot" },
      { label: "용두산메타버스 VR", link: "/meta" },
      { label: "프로젝션맵핑", link: "/mapping" },
      { label: "미디어월", link: "/media" },
      { label: "실감미디어콘텐츠", link: "/media-content" },
    ],
  },
  { label: "공지사항", icon: <IconGauge /> },
];
