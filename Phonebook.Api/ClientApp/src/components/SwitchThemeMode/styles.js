import tw, { styled } from 'twin.macro'

export const SwitchThemeModeButton = styled.button`
  ${tw`flex items-center p-2 `};

  svg {
    ${tw`fill-current text-purple-200`};
  }

  &:hover svg {
    ${tw`fill-current text-purple-100`};
  }
`;
