// 렌더러 역할을 해주는 페이지

import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled(View)``;
const Title = styled(Text)``;

const HomePresenter = () => {
  // Logic X

  // Rendering
  return (
    <Container>
      <Title>Home 메인 화면입니다</Title>
    </Container>
  );
};

export default HomePresenter;
