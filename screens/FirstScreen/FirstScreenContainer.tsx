import { useEffect, useState } from "react";
import FirstScreenPresenter from "./FirstScreenPresenter";
import { sampleImages } from "./assets/firstScreenImages";
import { View } from "react-native";

const FirstScreenContainer = () => {
  // 띄워줄 이미지 데이터
  const [images, setImages] = useState<string[]>();
  // 로딩 state
  const [loading, setLoading] = useState<boolean>(true);

  // 서버로부터 이미지 가져오기
  const getImagesFromServer = async () => {
    // Input Code : 서버에서 불러올 데이터들 여기에 적으시오..
    return sampleImages;
  };

  // 필요한 데이터 불러오기
  const getData = async () => {
    // 이미지를 불러오기/가져오기 (from server, local)
    const images = await getImagesFromServer();
    // const iamges = sampleImages;
    // + 추가적인 데이터 불러오기
    // -> Input code here...
    //불러온 이미지 할당
    setImages(images);
    // 모든 작업이 종료된 후
    setLoading(false);
  };

  // 컴포넌트가 실행돨 대 한 번 실행
  useEffect(() => {
    getData();
  }, []);

  // return <View />;
  return <FirstScreenPresenter images={images} loading={loading} />;
};

export default FirstScreenContainer;
