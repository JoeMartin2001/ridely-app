import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { InputStyles } from "./styles";

type AppTextInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  editable?: boolean;
  error?: string | null;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export const AppTextInput = (props: AppTextInputProps) => {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    editable,
    error = null,
    keyboardType,
    autoCapitalize,
  } = props;

  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const dividerColor = useThemeColor({}, "divider");
  const errorColor = useThemeColor({}, "error");

  return (
    <View style={InputStyles.fieldGroup}>
      <ThemedText style={InputStyles.fieldLabel}>{label}</ThemedText>
      <View
        style={[
          InputStyles.inputWrapper,
          {
            backgroundColor: cardColor,
            borderColor: error ? errorColor : dividerColor,
            borderWidth: error ? 1 : StyleSheet.hairlineWidth,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || dividerColor}
          style={[InputStyles.input, { color: textColor }]}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {error && (
        <ThemedText style={[InputStyles.errorText, { color: errorColor }]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
};
