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
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { height: HEIGHT } = Dimensions.get("window");
const _spacing = 8;
const _borderRadius = 12;
const _itemSize = HEIGHT * 0.7;
const _itemFullSize = _itemSize + _spacing * 2;

const Container = styled(View)`
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
  color: gray;
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

type CardProps = ISampleData;
// 스크롤 할 애니메이션 Card
function AnimatedCard({ id, author, description, image, title }: CardProps) {
  return (
    <Container>
      <BackgroundImg
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: image }}
      />
      <PosterImg source={{ uri: image }} />
      <Info>
        <Title>{title}</Title>
        <Desc>{description}</Desc>
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
    // event를 활용해서 스크롤 애니메이션
  });

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => <AnimatedCard {...item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: _spacing * 2,
        paddingHorizontal: _spacing * 3,
        paddingVertical: (HEIGHT - _itemFullSize) * 0.25,
      }}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      // ListHeaderComponent={() => <View />}
      // ListFooterComponent={() => <View />} // 개인정보나 저작권 정보 등등 들어감
    />
  );
}

export default VerticalTimeLine;
