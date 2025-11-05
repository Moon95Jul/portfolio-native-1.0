import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Myinfo from "../screens/Myinfo";
import { BottomTabStackList } from "./stack.d/BottomTab.d";

// Bottom Tab 사용하기 위한 네비게이터 생성
const Tabs = createBottomTabNavigator<BottomTabStackList>();

// Bottom Tab의 각 페이지의 Header 이름 가져오기
const getHeaderName = (screenName: keyof BottomTabStackList) => {
  switch (screenName) {
    case "Home":
      return "메인";
    case "MyInfo":
      return "내정보";
  }
};

const BottomTab = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitle: getHeaderName(route.name),
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="MyInfo" component={Myinfo} />
    </Tabs.Navigator>
  );
};

export default BottomTab;
