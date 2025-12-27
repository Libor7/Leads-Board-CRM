import { isActivationKey } from "@/shared/utils/accessibility";

interface UseClickableProps {
  onActivate: () => void;
}

export const useClickable = ({ onActivate }: UseClickableProps) => {
  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (isActivationKey(event.nativeEvent)) {
      event.preventDefault();
      onActivate();
    }
  };

  return {
    role: "button",
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: keyDownHandler,
  };
};
