import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../components/HomeScreen";
import BillingScreen from "../components/BillingScreen";
import InventoryScreen from "../components/InventoryScreen";
import { RootStackParamList } from "../shared/SharedInterface";
import GradientBackground from "../utils/GradientBackground";
import { Platform, View } from "react-native";
import { DEFAULT_THEME_COLOR } from "../utils/SysConsts";
import SalesScreen from "../components/SalesScreen";
import InventoryListScreen from "../components/InventoryListScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            height: Platform.OS === "ios" ? 100 : 80,
            backgroundColor: "transparent",
            elevation: 0,
          },
          headerTitleStyle: {
            color: DEFAULT_THEME_COLOR,
            fontSize: 20,
            fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
          },
          headerTintColor: DEFAULT_THEME_COLOR,
          headerBackground: () => (
            <GradientBackground>
              <View style={{ flex: 1 }} />
            </GradientBackground>
          ),
        }}
      >
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
        <Stack.Screen
          name="Sales"
          component={SalesScreen}
          options={{ title: "Sales" }}
        />
        <Stack.Screen
          name="InventoryList"
          component={InventoryListScreen}
          options={{ title: "Inventory List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
