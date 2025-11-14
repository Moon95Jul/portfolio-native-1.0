import {
  FlatList,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { styled } from "styled-components";
import { ISampleData, sampleData } from "../assets/sampleData";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { limitText } from "../utility/utils";
import { transform } from "@babel/core";

const { height: HEIGHT } = Dimensions.get("window");
const _spacing = 8;
const _borderRadius = 12;
const _itemSize = HEIGHT * 0.7;
const _itemFullSize = _itemSize + _spacing * 2;

const Container = styled(Animated.View)`
  height: ${_itemSize}px;
  padding: ${_spacing * 2}px;
  gap: ${_spacing}px;
`;

const BackgroundImg = styled(Image)`
  border-radius: ${_borderRadius}px;
`;

const PosterImg = styled(Image)`
  height: ${_itemSize * 0.6}px;
`;
const Info = styled(View)``;
const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;
const Desc = styled(Text)`
  color: #000000;
`;
const Author = styled(View)`
  flex-direction: row;
  gap: ${_spacing}px;
  align-items: center;
`;
const Name = styled(Text)`
  color: lightgray;
  font-size: 17px;
`;
const ProfileImg = styled(Image)`
  width: 25px;
  aspect-ratio: 1;
  border-radius: ${_borderRadius}px;
`;

type CardProps = ISampleData & {
  index: number;
  scrollY: SharedValue<number>;
};

// 스크롤 할 애니메이션 Card
function AnimatedCard({
  index,
  scrollY,
  id,
  author,
  description,
  image,
  title,
}: CardProps) {
  // Animation용 스타일
  const animStyle = useAnimatedStyle(() => {
    // 투명도 조절 애니메이션 prop
    const opacity = interpolate(
      scrollY.value,
      [index - 1, index, index + 1],
      [0.2, 1, 0.2]
    );
    // 스케일 사이즈 조절 애니메이션 Prop
    const scale = interpolate(
      scrollY.value,
      [index - 1, index, index + 1],
      [0.9, 1, 0.9]
    );
    const borderRadious = interpolate(
      scrollY.value,
      [index - 1, index, index + 1],
      [0, _borderRadius, 0]
    );
    // 실제 애니메이션 처리 된 StyleProps를 반환
    return {
      opacity: opacity,
      transform: [{ scale: scale }],
      borderRadius: borderRadious, // Container에서 radious 적용중이기에 적용 안됨. Container 에서 설정해야
    };
  });

  return (
    <Container style={animStyle}>
      <BackgroundImg
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: image }}
      />
      <PosterImg source={{ uri: image }} />
      <Info>
        <Title>{title}</Title>
        <Desc>{limitText(description, 200)}</Desc>
      </Info>
      <Author>
        <Name>{author.name}</Name>
        <ProfileImg source={{ uri: author.profileUrl }} />
      </Author>
    </Container>
  );
}

type Props = {
  data: ISampleData[] | undefined;
};

// 세로 스크롤이 가능한 애니메이션 Timeline
function VerticalTimeLine({ data }: Props) {
  // Animation 공유 값
  const scrollY = useSharedValue(0);
  // ScrollHandler : 스크롤 이동 포지션 값을 가져오기 위해(애니메이션)
  const onScroll = useAnimatedScrollHandler((event) => {
    // event를 활용해서 스크롤 시 변동된 변위값
    const offset = event.contentOffset.y;
    // 현재 스크롤 위치에서 보여지는 Item의 인덱스 번호
    const itemIndex = offset / _itemFullSize;
    // Animation Value에 index 값 전달
    scrollY.value = itemIndex;
  });

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <AnimatedCard {...item} index={index} scrollY={scrollY} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: _spacing * 2,
        paddingHorizontal: _spacing * 4,
        paddingVertical: (HEIGHT - _itemFullSize) * 0.25,
      }}
      // 자석 스크롤을 위한 options
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      // Scroll Handling위해 Event 받아오기
      onScroll={onScroll} //{(e) => {onScroll(e);}}

      // ListHeaderComponent={() => <View />}
      // ListFooterComponent={() => <View />} // 개인정보나 저작권 정보 등등 들어감
    />
  );
}

export default VerticalTimeLine;
