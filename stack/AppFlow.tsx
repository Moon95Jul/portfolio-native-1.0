import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, Text } from "react-native";
import LoadingScreen from "../screens/Loading/LoadingScreen";

// * 분기 = Authentication 인증 흐름에 따른 현재 인증상태
// 분기 종류에 따른 State 정보
type State = {
  isSignOut: boolean;
  isLoading: boolean;
  userToken: string | null;
};
// 분기 종류
type Action =
  | { type: "RESTORE_TOKEN"; token: string }
  | { type: "SIGN_OUT" }
  | { type: "SIGN_IN"; token: string | null };

export type AuthState = {
  signIn: () => Promise<void>;
  signOut: () => void;
  signUp: () => Promise<void>;
};

const AppFlow = () => {
  const [state, dispatch] = useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        // 1st 분기 : 앱 실행 시 가장 처음 실행되어 현재 상태 갱신
        // - 현재 로그인 인증 후, 토큰 보유 여부 확인
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
          };
        // 2nd 분기 : 로그인 실행 시, 로그인 정보 받고 상태 변경.
        case "SIGN_IN":
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        // 3rd 분기 : 로그아웃 실행 시, 모든 정포 폐기 후 상태 변경.
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
      }
    },
    // 초기값
    {
      isLoading: true,
      isSignOut: false,
      userToken: null,
    }
  );

  // 앱 실행 시, 한 번 실행
  // (RESTORE_TOKEN 상태로 변경하고, 로그인 인증 여부 검사)
  useEffect(() => {
    const restoreAsync = async () => {
      // 1.userToken (로그인토큰)
      let userToken;
      // 2.내 장치에 저장된 토큰 정보 불러오기(Load)
      try {
        // 내 장치에서 불러오기
        // userToken = await SecureStore.getItem("KEY");
      } catch (e) {
        console.warn(e);
      }
      // Token 불러오고 나면, Restore_Token 상태로 변경 후, Token 값 넣기
      dispatch({ type: "RESTORE_TOKEN", token: "dummy" });
    };

    restoreAsync();
  }, []);

  // 인증흐름을 위한 로그인 관련 Context
  // useMemo : 화면 Re-Rendering이 되더라도 함수 내에서 재실행시키고 싶지 않은 코드를 구현할 때 사용.
  const authValue = useMemo<AuthState>(() => {
    return {
      signIn: async () => {
        // Test용 더미 토큰
        const token = "dummy";
        try {
          // Server Api...
        } catch (e) {
          // Error...
        }
        dispatch({ type: "SIGN_IN", token });
      },
      signOut: () => {
        try {
          // Server Api...
        } catch (e) {
          // Error...
        }
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async () => {
        // Test용 더미 토큰
        const token = "dummy";
        try {
          // Server Api...
        } catch (e) {
          // Error...
        }
        dispatch({ type: "SIGN_IN", token });
      },
    };
  }, []);

  // 최초 앱 실행 시, 로그인 인증 전에
  // A. 로딩화면 => isLoading in reducer
  if (state.isLoading) {
    return <LoadingScreen />;
  }
  // B. Tutorial or Guide(=SplashScreen)
  // => AsyncStorage => 튜토리얼 실행 여부 판단

  return (
    <AuthContext.Provider value={authValue}>
      <NavigationContainer>
        {/* 로그인 인증 성공 */}
        <>
          <View>
            <Text>로그인 인증 실패</Text>
          </View>
        </>
        {/* 로그인 인증 실패 */}
        <>
          <MainStack />
        </>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppFlow;
