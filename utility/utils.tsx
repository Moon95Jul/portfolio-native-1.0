/**
 * Text의 길이를 제한하고 문장 말미에 ...표시
 * @param text 길이를 제한하려는 텍스트
 * @param limit 제한 길이
 */
export const limitText = (text: string, limit: number) => {
  return `${text.slice(0, limit)}...`;
};
