// 컴포넌트, 데이터 를 받아 분류 후 HomePresenter에 넘겨주는 페이지

import { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import { ISampleData, sampleData } from "../../assets/sampleData";

const HomeContainer = () => {
  // State
  const [data, setData] = useState<ISampleData[]>();
  const [loading, setLoading] = useState<boolean>(true);

  // Need to converting your server api func
  const YourServerAPI = async (): Promise<ISampleData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 3000ms(=3초) 후에 Promise<sampleData>를 반환
        return resolve(sampleData);
      }, 1500);
    });
  };

  // 비동기)여러 Data를 서버든, Local이든 불러오는 역할
  const getData = async () => {
    try {
      // 1. Server, 저장소에서 Data 가져오기
      const data = await YourServerAPI();
      // const data = sampleData;
      // 2. State에 할당
      setData(data);
    } catch (e) {
      // Error 발생 시
      console.error("HC, getData Error :", e);
    } finally {
      // 무사히 가져오면 로딩 종료
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Rendering
  return <HomePresenter data={data} loading={loading} />;
};

export default HomeContainer;
