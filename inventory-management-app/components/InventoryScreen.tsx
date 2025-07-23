import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput as RNTextInput,
} from "react-native";
import { Text, Button, useTheme, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dropdownOptions } from "../utils/SysData";
import GradientBackground from "../utils/GradientBackground";
import { SelectList } from "react-native-dropdown-select-list";
import { DEFAULT_THEME_COLOR } from "../utils/SysConsts";

type FormData = {
  category: string;
  metalType: string;
  purity: string;
  supplier: string;
  weight: string;
  quantity: string;
  price: string;
  date: Date;
};

type FormDataKeys = keyof FormData;

const InventoryScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    metalType: "",
    purity: "",
    supplier: "",
    weight: "",
    quantity: "",
    price: "",
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (field: string, value: string | Date) => {
    setFormData({ ...formData, [field]: value });
    if (field === "date") {
      setShowDatePicker(false);
    }
  };

  const handleSelect = (field: FormDataKeys, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderDropdown = (
    field: FormDataKeys,
    label: string,
    options: Array<{ key: string; value: string }>
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={[styles.label, { color: "#d4af37" }]}>{label} *</Text>
      <SelectList
        data={options}
        setSelected={(val: string) => handleSelect(field, val)}
        search={true}
        placeholder={`Select ${label.toLowerCase()}`}
        boxStyles={styles.dropdownBox}
        dropdownStyles={styles.dropdownList}
        dropdownItemStyles={styles.dropdownItem}
        dropdownTextStyles={styles.dropdownText}
        inputStyles={styles.inputText}
        searchPlaceholder={`Search ${label.toLowerCase()}...`}
        searchicon={<Text style={{ marginRight: 10 }}>🔍</Text>}
        arrowicon={<Text style={{ color: "#d4af37", marginLeft: 10 }}>▼</Text>}
      />
    </View>
  );

  return (
    <GradientBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Dropdowns */}
        {renderDropdown("category", "Category", dropdownOptions.category)}
        {renderDropdown("metalType", "Metal Type", dropdownOptions.metalType)}
        {renderDropdown("purity", "Purity", dropdownOptions.purity)}
        {renderDropdown("supplier", "Supplier", dropdownOptions.supplier)}

        {/* Other inputs remain the same as previous implementation */}
        {/* Weight Input */}
        <TextInput
          label="Weight (grams) *"
          value={formData.weight}
          onChangeText={(text) => handleChange("weight", text)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          theme={{
            colors: {
              primary: "#d4af37",
              background: "rgba(255,255,255,0.1)",
              text: "#ffffff",
            },
          }}
        />
        {/* Quantity Input */}
        <TextInput
          label="Quantity *"
          value={formData.quantity}
          onChangeText={(text) => handleChange("quantity", text)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          theme={{
            colors: {
              primary: "#d4af37",
              background: "rgba(255,255,255,0.1)",
              text: "#ffffff",
            },
          }}
        />
        {/* Price Input */}
        <TextInput
          label="Price (₹) *"
          value={formData.price}
          onChangeText={(text) => handleChange("price", text)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          theme={{
            colors: {
              primary: "#d4af37",
              background: "rgba(255,255,255,0.1)",
              text: "#ffffff",
            },
          }}
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
            {formData.date.toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  handleChange("date", selectedDate);
                }
              }}
            />
          )}
        </View>

        <Button
          mode="contained"
          onPress={() => console.log("Add Inventory")}
          style={styles.addButton}
          labelStyle={styles.buttonLabel}
        >
          Add Inventory
        </Button>
      </ScrollView>
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
    color: "#d4af37",
    marginBottom: 8,
    fontSize: 14,
  },
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 10, // Important for overlapping other elements
  },
  dropdownBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "#d4af37",
    borderRadius: 30,
    paddingVertical: 12,
  },
  dropdownList: {
    backgroundColor: "rgba(58,58,68,0.95)",
    borderColor: "#d4af37",
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
    backgroundColor: "#d4af37",
  },
  buttonLabel: {
    color: "#000000",
  },
  dateButton: {
    borderColor: "#d4af37",
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
