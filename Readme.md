# Create Expo Bare Project

npx create-expo-app myproject --template bare-minimum

# 1. Install React Navigator

url : https://reactnavigation.org/docs/getting-started
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context (for bare project)

# 2. Add Native Stack

npm install @react-navigation/Native-stack

# 3. Add Bottom Tab Bar

npm install @react-navigation/bottom-tabs

#Install Libarary

in case npm install fail.. -> add command "--force"

1. Styled-components for RN
   npm install @types/styled-components-react-native

# Install Extensions

- Prettier (file-preferences-VS Code Settings : "Default formatter", "Format on Save")
- styled-components (by styled-components)

## ReactNative 애니메이션 관련 기본 라이브러리

> > > 1번째 설치

- npx expo install react-native-gesture-handler -- --force
- npx expo install react-native-reanimated

> > > 1번째 설치로도 Error 발생 시, 아래 라이브러리 설치

- npx expo install react-native-screens
- npx expo install react-native-safe-area-context
- npx expo install @react-native-community/masked-view

#### ReactNative easy 라이브러리 설치

- npx expo install @animatereactnative/marquee --force
- npx expo install @animatereactnative/stagger --force
- force 싫으면 yarm 으로
