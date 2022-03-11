import React from 'react';

// See https://github.com/reach/router/issues/74#issuecomment-397085896
// @ts-ignore
import { match } from '@reach/router/lib/utils';

export const extractPathParams = (props: any): any | null => {
  if (props.pageContext.matchPath) {
    const result = match(props.pageContext.matchPath, props.location.pathname);
    if (result && result.params) {
      return result.params;
    }
  }
  return null;
};

const RootLayout = (props: any) => {
  return React.cloneElement(props.children, extractPathParams(props));
};

export default RootLayout;