import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../components/HomeScreen";
import BillingScreen from "../components/BillingScreen";
import InventoryScreen from "../components/InventoryScreen";
import { RootStackParamList } from "../shared/SharedConstants";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Inventory Management System" }}
        />
        <Stack.Screen
          name="Billing"
          component={BillingScreen}
          options={{ title: "Billing Counter" }}
        />
        <Stack.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{ title: "Inventory Management" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
