// 렌더러 역할을 해주는 페이지

import { View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import VerticalTimeLine from "../../components/VerticalTimeLine";
import { ISampleData } from "../../assets/sampleData";
import LoadingScreen from "../Loading/LoadingScreen";

const Container = styled(View)``;
const Title = styled(Text)``;

type Props = {
  loading: boolean;
  data: ISampleData[] | undefined;
};

const HomePresenter = ({ data, loading }: Props) => {
  // Logic X
  if (loading) {
    return (
      <LoadingScreen />
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <ActivityIndicator size={"large"} />
      // </View>
    );
  }
  // Rendering
  return (
    <Container>
      <VerticalTimeLine data={data} />
    </Container>
  );
};

export default HomePresenter;
