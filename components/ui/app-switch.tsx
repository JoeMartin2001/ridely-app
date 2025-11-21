import { useThemeColor } from "@/hooks/use-theme-color";
import React, { forwardRef, memo } from "react";
import { Switch } from "react-native";

interface AppSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const AppSwitch = forwardRef<Switch, AppSwitchProps>((props, ref) => {
  const { value, onChange } = props;

  const switchThumbColor = useThemeColor({}, "switchThumb");
  const switchTrackColor = useThemeColor({}, "switchTrack");
  const switchTrackInactiveColor = useThemeColor({}, "switchTrackInactive");

  return (
    <Switch
      ref={ref}
      value={value}
      onValueChange={onChange}
      thumbColor={switchThumbColor}
      trackColor={{
        false: switchTrackInactiveColor,
        true: switchTrackColor,
      }}
    />
  );
});

AppSwitch.displayName = "AppSwitch";

const MemoizedAppSwitch = memo(AppSwitch);
export default MemoizedAppSwitch;
