import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

export const KeyboardAvoidingWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
