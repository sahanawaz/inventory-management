import React from "react";
import { TextInput } from "react-native-paper";
import { DEFAULT_THEME_COLOR } from "./SysConsts";

interface TxtProp {
  styles?: any;
  onChangeHandler: any;
  value: string;
  label: any;
  themeProp?: any;
  keyboardType?: any;
  mode?: "flat" | "outlined" | undefined;
}

export const DEFAULT_THEME_TXT = {
  colors: {
    primary: DEFAULT_THEME_COLOR,
    background: "rgba(255,255,255,0.1)",
  },
};
export const DEFAULT_STYLES = {
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  textColor: "#ffffff",
  placeholderTextColor: DEFAULT_THEME_COLOR,
};
const DEFAULT_KEYBOARD_TYPE = "name-phone-pad";
const DEFAULT_MODE = "flat";

const TextField: React.FC<TxtProp> = ({
  styles = DEFAULT_STYLES,
  onChangeHandler,
  value,
  label,
  themeProp = DEFAULT_THEME_TXT,
  keyboardType = DEFAULT_KEYBOARD_TYPE,
  mode = DEFAULT_MODE,
}) => {
  return (
    <TextInput
      mode={mode}
      label={label}
      value={value}
      onChangeText={onChangeHandler}
      style={styles.input}
      theme={themeProp}
      textColor={styles.textColor}
      placeholderTextColor={styles.placeholderTextColor}
      keyboardType={keyboardType}
    />
  );
};

export default TextField;
