import { Suspense } from "react";
import { SUPPORTED_ICONS, type SupportedIcons } from "./icon.constants";

type IconProps = {
  icon: SupportedIcons;
};

const Icon = ({ icon }: IconProps) => {
  const IconComponent = SUPPORTED_ICONS[icon];

  return (
    <Suspense fallback={null}>
      <IconComponent />
    </Suspense>
  );
};

export default Icon;
