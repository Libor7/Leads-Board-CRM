import { SUPPORTED_ICONS, type SupportedIcons } from "./icon.constants";

type IconProps = {
  icon: SupportedIcons;
};

const Icon = ({ icon }: IconProps) => {
  const IconComponent = SUPPORTED_ICONS[icon];

  return <IconComponent />;
};

export default Icon;
