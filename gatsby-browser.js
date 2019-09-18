import React from 'react';
import Amplify from 'aws-amplify';
import { ThemeProvider } from 'styled-components';
import { NavContextProvider } from './src/context/NavContext';

// Import API key so that we could use AppSync
import config from './src/aws-exports';

Amplify.configure(config);

const theme = {};

export const wrapRootElement = ({ element }) => (
  <NavContextProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </NavContextProvider>
);
