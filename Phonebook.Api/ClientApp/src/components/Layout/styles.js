import tw, { styled } from 'twin.macro'

export const LayoutWrapper = styled.main`
  ${tw`flex flex-col min-h-screen`};
`;

export const MainWrapper = styled.main`
  ${tw`flex flex-col flex-1 w-full max-w-screen-lg mx-auto mt-5 p-5`};
`;
