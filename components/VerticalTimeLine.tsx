import { FlatList, View } from "react-native";
import { styled } from "styled-components";
import { sampleData } from "../assets/sampleData";

const Container = styled(View)``;

// 스크롤 할 애니메이션 Card
function AnimatedCard() {
  return <Container></Container>;
}

const Flat = styled(FlatList)``;

// 세로 스크롤이 가능한 애니메이션 Timeline
function VerticalTimeLine() {
  return (
    <Flat
      data={sampleData}
      renderItem={({ item, index }) => <AnimatedCard />}
    />
  );
}
