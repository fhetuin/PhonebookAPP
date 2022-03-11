import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { uiSelector } from 'state/ui';
import PropTypes from 'prop-types';

import 'styles/global.css';
import GlobalStyles from 'styles/globalStyles';
import * as Theme from 'styles/theme';
import { LayoutWrapper, MainWrapper } from './styles';
import Navbar from '../Navbar';

const Layout = ({ children })  => {
  const { themeMode } = useSelector(uiSelector);

  return (
    <ThemeProvider theme={Theme[themeMode]}>
      <GlobalStyles />
      <LayoutWrapper>

        <Navbar/>
        <MainWrapper>{children}</MainWrapper>
            <footer>
                <p>Copyright 2022 Wemanity</p>
            </footer>

      </LayoutWrapper>
    </ThemeProvider>
  );

}

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

export default Layout;
