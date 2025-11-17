import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useCallback, useState } from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import MaskInput, { Mask } from "react-native-mask-input";
import { InputStyles } from "./styles";

const uzbekPhoneMask: Mask = [
  "+",
  "9",
  "9",
  "8",
  " ",
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

type AppMaskInputProps = {
  label?: string;
  value: string;
  onChangeText: (masked: string, unmasked?: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  editable?: boolean;
  error?: string | null;
  helperText?: string;
  mask?: Mask;
  keyboardType?: "default" | "phone-pad" | "numeric" | "email-address";
  textContentType?: "telephoneNumber" | "none";
  autoComplete?: "tel" | "off";
  returnKeyType?: "done" | "next" | "search" | "send";
  selectionColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  showLabel?: boolean;
  focusedBorderColor?: string;
  inputStyle?: TextStyle;
};

export const AppMaskInput = (props: AppMaskInputProps) => {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    editable = true,
    error = null,
    helperText,
    mask = uzbekPhoneMask,
    keyboardType = "phone-pad",
    textContentType = "telephoneNumber",
    autoComplete = "tel",
    returnKeyType = "done",
    selectionColor,
    onFocus,
    onBlur,
    accessibilityLabel,
    accessibilityHint,
    showLabel = true,
    focusedBorderColor,
    inputStyle,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const dividerColor = useThemeColor({}, "divider");
  const errorColor = useThemeColor({}, "error");
  const tintColor = useThemeColor({}, "tint");
  const helperColor = useThemeColor({}, "tagline");

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const borderColor = error
    ? errorColor
    : isFocused && focusedBorderColor
    ? focusedBorderColor
    : isFocused
    ? tintColor
    : dividerColor;

  const displayHelperText = error || helperText;
  const helperTextColor = error ? errorColor : helperColor;

  return (
    <View style={InputStyles.fieldGroup}>
      {showLabel && label && (
        <ThemedText style={InputStyles.fieldLabel}>{label}</ThemedText>
      )}
      <View
        style={[
          InputStyles.inputWrapper,
          {
            backgroundColor: cardColor,
            borderColor,
            borderWidth: error || isFocused ? 1 : StyleSheet.hairlineWidth,
          },
        ]}
      >
        <MaskInput
          style={[
            InputStyles.input,
            {
              color: textColor,
            },
            inputStyle,
          ]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          mask={mask}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || dividerColor}
          textContentType={textContentType}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          selectionColor={selectionColor || tintColor}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={accessibilityHint}
        />
      </View>
      {displayHelperText && (
        <ThemedText style={[InputStyles.errorText, { color: helperTextColor }]}>
          {displayHelperText}
        </ThemedText>
      )}
    </View>
  );
};
