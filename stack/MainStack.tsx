import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import FirstScreen from "../screens/FirstScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* 첫번째 Screen = 자동으로 보여지는 화면 */}
      <Stack.Screen
        name="First"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
