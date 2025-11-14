import { faker } from "@faker-js/faker";

// dummy 데이터의 랜덤 시드 개수
faker.seed(20);

// Type
export interface ISampleData {
  id: string;
  author: {
    name: string;
    profileUrl: string;
  };
  title: string;
  description: string;
  image: string;
}

// 20개짜리 dummy(faker) Data 생성하는 방법
export const sampleData: ISampleData[] = [...Array(20).keys()].map(() => {
  // 실제 dummy 데이터의 key-value 값을 채워넣는다.
  return {
    id: faker.string.uuid(),
    author: {
      name: faker.person.fullName(),
      profileUrl: faker.image.avatarGitHub(),
    },
    title: faker.music.songName(),
    description: faker.lorem.sentence({ min: 3, max: 60 }),
    image: faker.image.urlPicsumPhotos({
      width: 300,
      height: 300 * 1.6,
      blur: 0,
    }),
  };
});
