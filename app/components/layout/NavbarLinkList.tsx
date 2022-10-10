import {
  IconAlertCircle,
  IconDatabase,
  IconGitPullRequest,
  IconMessages,
} from "@tabler/icons";
import { NavbarLinkItem } from "~/components/layout/NavbarLinkItem";

export default function NavbarLinkList() {
  return (
    <div>
      {links.map(({ icon, label, color }) => (
        <NavbarLinkItem key={label} icon={icon} label={label} color={color} />
      ))}
    </div>
  );
}

const links = [
  {
    icon: <IconGitPullRequest size={16} />,
    color: "blue",
    label: "Pull Requests",
  },
  { icon: <IconAlertCircle size={16} />, color: "teal", label: "Open Issues" },
  { icon: <IconMessages size={16} />, color: "violet", label: "Discussions" },
  { icon: <IconDatabase size={16} />, color: "grape", label: "Databases" },
];
