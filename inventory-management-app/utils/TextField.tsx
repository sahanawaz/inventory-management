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
}

const DEFAULT_THEME = {
  colors: {
    primary: "#d4af37",
    background: "rgba(255,255,255,0.1)",
  },
};
const DEFAULT_STYLES = {
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  textColor: "#ffffff",
  placeholderTextColor: DEFAULT_THEME_COLOR,
};
const DEFAULT_KEYBOARD_TYPE = "name-phone-pad";

const TextField: React.FC<TxtProp> = ({
  styles = DEFAULT_STYLES,
  onChangeHandler,
  value,
  label,
  themeProp = DEFAULT_THEME,
  keyboardType = DEFAULT_KEYBOARD_TYPE,
}) => {
  return (
    <TextInput
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
