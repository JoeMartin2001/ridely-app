import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  vertical?: number;
  horizontal?: number;
};

export const Spacing = (props: Props) => {
  const { vertical, horizontal } = props;

  const styles: StyleProp<ViewStyle> = {
    marginHorizontal: horizontal,
    marginVertical: vertical,
  };

  return <View style={styles} />;
};
export const Space = () => <Spacing vertical={5} />;
