import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import Layout from "@/Layout";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
        <Layout>
            <Router />
        </Layout>
    </MantineProvider>
  );
}
