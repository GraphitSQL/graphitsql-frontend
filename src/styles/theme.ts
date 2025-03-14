import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'teal',
    },
    body: {
      '--removed-body-scroll-bar-size': '0px !important',
    },
  },
});

export const system = createSystem(defaultConfig, config);
