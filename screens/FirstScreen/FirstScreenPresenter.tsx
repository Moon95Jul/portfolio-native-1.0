import { Marquee } from "@animatereactnative/marquee";
import { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { styled } from "styled-components";
import LoadingScreen from "../Loading/LoadingScreen";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { Stagger } from "@animatereactnative/stagger";
import { useNavigation } from "@react-navigation/native";

// DesignSystem..
const { width: WIDTH } = Dimensions.get("screen");
const _itemWidth = WIDTH * 0.6;
const _itemHeight = _itemWidth * 1.6;
const _borderRadious = 16;
const _spacing = 16;
const _itemFullSize = _itemWidth + _spacing;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;
const HorizontalView = styled(Animated.View)`
  flex-direction: row;
  gap: ${_spacing}px;
`;

const BackGroundView = styled(View)`
  opacity: 0.4;
`;

const StyleText = styled(Text)<{ size: number }>`
  font-size: ${(props) => props.size}px;
  color: white;
  font-weight: 700;
`;
const SigninBtn = styled(TouchableOpacity)`
  border-radius: ${_borderRadious}px;
  justify-content: center;
  align-items: center;
  padding: ${_spacing * 0.5}px;
  background-color: #fff;
  margin-top: ${_spacing};
`;

type Props = {
  images: string[] | undefined;
  loading: boolean;
};

const FirstScreenPresenter = ({ images, loading }: Props) => {
  // 애니메이션 Component에서 공유되는 변환 값
  const offset = useSharedValue(0);

  const navi = useNavigation();
  const goToScreen = () => navi.navigate("Tabs", { screen: "Home" });

  // 현재 포커싱 된 Marquee 애니메이션 이미지의 Index
  const [activeIndex, setActiveIndex] = useState(0);
  // 화면 상에서 가운데에 위치한 이미지의 Index 번호 가져오기
  // useAnimatedReaction :
  // 1번 parameter : 스크롤 진행됨에 따라 Index 계산
  // 2번 parameter : 계산한 Index를 Javascript Code 에 할당
  useAnimatedReaction(
    () => {
      if (!images) return 0;
      // 1. 현재 스크롤이 진행되는 시점의 Item(img) index 구하기
      // - 현재 스크롤 진행 위치 : offset.value
      // - 간격을 포함한 전체 아이템 너비 : -itemFullSize
      // - 현재 스크롤 진행 위치의 index
      // + 화면의 정중앙에서 카운트가 되도록 -> 오른쪽으로 화면너비의 1/2 만큼 이동 : width*0.5
      const currentIndex = (offset.value + WIDTH * 0.5) / _itemFullSize;
      // -images의 최대개수를 넘어가지 않고, 반복되는 index로 convert
      const repeatIndex = currentIndex % images.length;
      // - 최종 정수값 Index 로 convert
      const finalIndex = Math.abs(Math.floor(repeatIndex));
      // 2. 내가 구한 index 값 return 해서 2번 parameter에 전달
      return finalIndex;
    },
    (value) => {
      // UIThread 에서 구한 값을 JSThread 에서 실행
      runOnJS(setActiveIndex)(value);
    }
  );

  // A. 로딩 중인 경우에는 로딩 화면 띄워주기
  if (loading) {
    return <View />; // LoadingScreen에 문제 있음
  }

  // B. 로딩이 끝나면 보여줄 화면
  return (
    <Container>
      {/* 스크롤 이미지의 배경화면 */}
      <BackGroundView style={StyleSheet.absoluteFillObject}>
        <Animated.Image
          style={{ flex: 1 }}
          blurRadius={5}
          // key 값 필수(*requirement) -entering&exiting
          key={`img-${activeIndex}`}
          // 컴포넌트 등장시, or 새로운 데이터 입력 시
          entering={FadeIn.duration(1000)}
          // 컴포넌트 파괴 시, or 새로운 데이터 입력 시
          exiting={FadeOut.duration(1000)}
          source={{ uri: images && images[activeIndex] }}
        />
      </BackGroundView>
      {/* 자동 순환 스크롤 애니메이션 영역 */}
      <Marquee spacing={_spacing} position={offset} reverse={false}>
        <HorizontalView
          key={`horizontal-anim`}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeight * 0.5 }],
            })}
        >
          {images?.map((image, _index) => (
            <Item
              key={_index}
              image={image}
              index={_index}
              offset={offset.value}
              itemLength={image.length}
            />
          ))}
        </HorizontalView>
      </Marquee>
      <Stagger
        initialEnteringDelay={1000}
        duration={1000}
        stagger={80}
        style={{
          marginTop: 30,
          padding: 50,
        }}
      >
        <StyleText size={20}>Title XXXX</StyleText>
        <StyleText size={13}>
          Welcome to my project. Glad to meet you!
        </StyleText>
        <SigninBtn onPress={goToScreen}>
          <StyleText style={{ color: "black" }} size={20}>
            Google Sign in
          </StyleText>
        </SigninBtn>
      </Stagger>
    </Container>
  );
};

// 이미지를 화면에 하나씩 띄워서 보여줄 컴포넌트
const ItemBox = styled(Animated.View)`
  width: ${_itemWidth}px;
  height: ${_itemHeight}px;
  border-radius: ${_borderRadious}px;
`;
const ItemImg = styled(Image)`
  flex: 1;
  border-radius: ${_borderRadious}px;
`;

function Item({
  image,
  index,
  offset,
  itemLength,
}: {
  image: string;
  index: number;
  offset: SharedValue<number>;
  itemLength: number;
}) {
  // 0. Animated 컴포넌트 생성
  // 1. 0번 컴포넌트에 Animation용 style 생성
  // 2. Animation용 스타일 적용
  return (
    <ItemBox
    // style={animStyle}
    >
      <ItemImg source={{ uri: image }} />
    </ItemBox>
  );
}

export default FirstScreenPresenter;
