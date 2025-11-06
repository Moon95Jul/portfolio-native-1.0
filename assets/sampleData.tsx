import { faker } from "@faker-js/faker";

// dummy 데이터의 랜덤 시드 개수
faker.seed(12);

interface IDummyData {}

// 20개짜리 dummy(faker) Data 생성하는 방법
export const sampleData = [...Array(20).keys()].map(() => {
  // 실제 dummy 데이터의 key-value 값을 채워넣는다.
  return {
    id: faker.string.uuid(),
    author: {
      name: faker.person.fullName(),
      profileUrl: faker.image.avatarGitHub(),
    },
    imgUrl: faker.image.urlPicsumPhotos({ width: 300, height: 300 * 1.6 }),

    title: faker.music.songName(),
    description: faker.lorem.sentence({
      min: 1,
      max: 3,
    }),
  };
});
