import { useThemeColor } from "@/hooks/use-theme-color";
import React, { forwardRef } from "react";
import { Switch } from "react-native";

interface AppSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const AppSwitch = forwardRef<Switch, AppSwitchProps>((props, ref) => {
  const { value, onChange } = props;

  const switchThumbColor = useThemeColor({}, "switchThumb");
  const switchTrackColor = useThemeColor({}, "switchTrack");
  const switchTrackInactiveColor = useThemeColor({}, "switchTrackInactive");

  return (
    <Switch
      value={value}
      onValueChange={onChange}
      thumbColor={switchThumbColor}
      trackColor={{
        false: switchTrackInactiveColor,
        true: switchTrackColor,
      }}
      // ios_backgroundColor={switchTrackInactiveColor}
    />
  );
});

AppSwitch.displayName = "AppSwitch";
