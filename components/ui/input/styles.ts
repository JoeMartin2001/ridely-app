import { Shadows } from "@/constants/style";
import { StyleSheet } from "react-native";

export const InputStyles = StyleSheet.create({
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    opacity: 0.7,
    textTransform: "uppercase",
  },
  inputWrapper: {
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
    paddingVertical: 14,
    ...Shadows.xxxs,
  },
  input: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
