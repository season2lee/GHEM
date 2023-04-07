const breakpoints = [479, 767, 1023];

// 임시 모바일 최대 크기 = 767px
export const mobile = `
  @media (max-width: ${breakpoints[1]}px)
`;

// 모바일
// export const mobile = `
//   @media (max-width: ${breakpoints[0]}px)
// `;

// 태블릿 가로
export const tabletH = `
  @media (max-width: ${breakpoints[2]}px)
`;

// 태블릿 세로
// export const tabletV = `
//   @media (max-width: ${breakpoints[2]}px)
// `;

// 1024 이상의 크기는 데스크톱
