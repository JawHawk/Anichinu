import React from 'react';
import { createRoot } from 'react-dom/client';

import Newtab from './Newtab';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <MantineProvider defaultColorScheme="dark" withGlobalStyles withNormalizeCSS>
    <Newtab />
  </MantineProvider>
);
