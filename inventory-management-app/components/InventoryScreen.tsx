import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import GradientBackground from "../utils/GradientBackground";
import { SelectList } from "react-native-dropdown-select-list";
import { DEFAULT_THEME_COLOR, ERR_MSG, HTTP_STATUS } from "../utils/SysConsts";
import TextField from "../utils/TextField";
import { textFieldStyles } from "../shared/SharedStyles";
import { CallApiPost } from "../utils/ServiceHelper";
import { DropdownOpts, RootStackParamList } from "../shared/SharedConstants";
import useAlertModal from "../helper/useAlertModal";
import useLoader from "../helper/useLoader";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

type FormData = {
  categoryType: number;
  inventoryType: number;
  color: number;
  dimension: number;
  unitCp: number;
  unitSp: number;
  qty: number;
  date: Date;
  description: string;
};

type FormDataKeys = keyof FormData;

const initDropdownOpts = {
  catTypeOpts: [],
  invTypeOpts: [],
  colorOpts: [],
  dimensionOpts: [],
};

const initFormData = {
  categoryType: 0,
  inventoryType: 0,
  color: 0,
  dimension: 0,
  unitCp: 0,
  unitSp: 0,
  qty: 0,
  date: new Date(),
  description: "",
};

type InventoryScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Inventory">;
};

const InventoryScreen: React.FC<InventoryScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>(
    JSON.parse(JSON.stringify(initFormData))
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownOpts, setDropdownOpts] = useState<DropdownOpts>(
    JSON.parse(JSON.stringify(initDropdownOpts))
  );
  const { showModal, hideModal, Modal } = useAlertModal();
  const { startAnimation, stopAnimation, Loader } = useLoader();

  useFocusEffect(
    useCallback(() => {
      fetchDropdownOpts();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setFormData(JSON.parse(JSON.stringify(initFormData))); // Clear the selected value
    });
    return unsubscribe; // Clean up the listener
  }, [navigation]);

  const openAlert = (
    argMsg: string[],
    argIsSuc: -1 | 0 | 1,
    argIconSrc: string,
    callback: () => void
  ) => {
    showModal(
      {
        visible: true,
        message: argMsg,
        isSuccess: argIsSuc,
        iconSrc: argIconSrc,
      },
      callback
    );
  };

  const fetchDropdownOpts = async () => {
    startAnimation();
    const optResp = await CallApiPost("options", [
      "COLOR",
      "DIMENSION",
      "CATEGORY_TYPE",
      "INVENTORY_TYPE",
    ]);
    if (optResp.respCode === HTTP_STATUS.OK) {
      setDropdownOpts({
        catTypeOpts: optResp.respData.filter(
          (opt: { code: string }) => opt.code === "CATEGORY_TYPE"
        ),
        invTypeOpts: optResp.respData.filter(
          (opt: { code: string }) => opt.code === "INVENTORY_TYPE"
        ),
        colorOpts: optResp.respData.filter(
          (opt: { code: string }) => opt.code === "COLOR"
        ),
        dimensionOpts: optResp.respData.filter(
          (opt: { code: string }) => opt.code === "DIMENSION"
        ),
      });
    } else {
      openAlert(
        [
          "Sorry, we failed to get dropdown options. Please try after sometime!!",
        ],
        -1,
        "",
        () => {}
      );
    }
    stopAnimation();
  };

  const handleChange = (field: string, value: number | Date | string) => {
    setFormData({ ...formData, [field]: value });
    if (field === "date") {
      setShowDatePicker(false);
    }
  };

  const handleSelect = (field: FormDataKeys, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderDropdown = (
    field: FormDataKeys,
    label: string,
    options: Array<{ key: number; value: string }>
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={[styles.label, { color: DEFAULT_THEME_COLOR }]}>
        {label} *
      </Text>
      <SelectList
        data={options}
        setSelected={(val: number) => handleSelect(field, val)}
        search={true}
        placeholder={`Select ${label.toLowerCase()}`}
        boxStyles={styles.dropdownBox}
        dropdownStyles={styles.dropdownList}
        dropdownItemStyles={styles.dropdownItem}
        dropdownTextStyles={styles.dropdownText}
        inputStyles={styles.inputText}
        searchPlaceholder={`Search ${label.toLowerCase()}...`}
        searchicon={<Text style={{ marginRight: 10 }}>🔍</Text>}
        arrowicon={
          <Text style={{ color: DEFAULT_THEME_COLOR, marginLeft: 10 }}>▼</Text>
        }
      />
    </View>
  );

  const handleOnAddInventory = async () => {
    startAnimation();
    const invResp = await CallApiPost("createStock", formData);
    if (invResp.respCode === HTTP_STATUS.CREATED) {
      openAlert(["Thank You, Inventory added successfully"], 0, "", () => {
        hideModal();
        setFormData(JSON.parse(JSON.stringify(initFormData)));
        navigation.navigate("InventoryList");
      });
    } else {
      openAlert([ERR_MSG.E500], -1, "", () => {});
    }
    stopAnimation();
  };

  return (
    <GradientBackground style={styles.container}>
      {Loader}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextField
          label={
            <Text style={textFieldStyles.sectionTitle} variant="titleMedium">
              Particular *
            </Text>
          }
          value={formData?.description?.toString()}
          onChangeHandler={(v: any) => handleChange("description", String(v))}
        />
        {/* Dropdowns */}
        {renderDropdown(
          "categoryType",
          "Category Type",
          dropdownOpts.catTypeOpts
        )}
        {renderDropdown(
          "inventoryType",
          "Inventory Type",
          dropdownOpts.invTypeOpts
        )}
        {renderDropdown("color", "Color", dropdownOpts.colorOpts)}
        {renderDropdown("dimension", "Dimension", dropdownOpts.dimensionOpts)}

        {/* Other inputs remain the same as previous implementation */}
        {/* Cost Price Input */}
        <TextField
          label={
            <Text style={textFieldStyles.sectionTitle} variant="titleMedium">
              Unit Cost Price *
            </Text>
          }
          value={formData?.unitCp?.toString()}
          onChangeHandler={(v: any) =>
            handleChange("unitCp", parseFloat(v) || 0)
          }
          keyboardType="numeric"
        />
        <TextField
          label={
            <Text style={textFieldStyles.sectionTitle} variant="titleMedium">
              Unit Selling Price *
            </Text>
          }
          value={formData?.unitSp?.toString()}
          onChangeHandler={(v: any) =>
            handleChange("unitSp", parseFloat(v) || 0)
          }
          keyboardType="numeric"
        />
        <TextField
          label={
            <Text style={textFieldStyles.sectionTitle} variant="titleMedium">
              Quantity
            </Text>
          }
          value={formData?.qty?.toString()}
          onChangeHandler={(v: any) => handleChange("qty", parseFloat(v) || 0)}
          keyboardType="numeric"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date *</Text>
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
            icon="calendar"
            textColor={DEFAULT_THEME_COLOR}
          >
            {`${new Date(formData?.date)?.getDate()}-${
              new Date(formData?.date)?.getMonth() + 1
            }-${new Date(formData?.date)?.getFullYear()}`}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(formData?.date)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  handleChange("date", selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleOnAddInventory}
          style={styles.addButton}
          labelStyle={styles.buttonLabel}
        >
          Add Inventory
        </Button>
      </ScrollView>
      {Modal}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 16,
    zIndex: 1, // Ensure dropdowns appear above other elements
  },
  label: {
    color: DEFAULT_THEME_COLOR,
    marginBottom: 8,
    fontSize: 14,
  },
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 10, // Important for overlapping other elements
  },
  dropdownBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: DEFAULT_THEME_COLOR,
    paddingVertical: 12,
  },
  dropdownList: {
    backgroundColor: "rgba(58,58,68,0.95)",
    borderColor: DEFAULT_THEME_COLOR,
    marginTop: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212,175,55,0.2)",
  },
  dropdownText: {
    color: "#ffffff",
  },
  addButton: {
    marginTop: 24,
    backgroundColor: DEFAULT_THEME_COLOR,
  },
  buttonLabel: {
    color: "#000000",
  },
  dateButton: {
    borderColor: DEFAULT_THEME_COLOR,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  inputText: {
    color: "#ffffff",
  },
});

export default InventoryScreen;
