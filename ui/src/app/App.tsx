import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import Layout from "./Layout.tsx";
import {SessionPage} from "../features/sessions/Session.tsx";
import {NewSessionPage} from "../features/sessions/NewSession.tsx";
import {JoinSessionPage} from "../features/sessions/JoinSession.tsx";
import {Routes, Route, HashRouter} from "react-router-dom";
import {NotFoundPage} from "../features/errors/404/NotFound.tsx";
import {IndexPage} from "../features/index/Index.tsx";

export default function App() {
  return (
      <MantineProvider theme={theme} defaultColorScheme={"auto"}>
          <Layout>
          <HashRouter>
              <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/session/:sessionId" element={<SessionPage />} />
                  <Route path="/session/new" element={<NewSessionPage />} />
                  <Route path="/session/:sessionId/join" element={<JoinSessionPage />} />
                  <Route path="/session/join" element={<JoinSessionPage />} />
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </HashRouter>
          </Layout>
      </MantineProvider>
  );
}
