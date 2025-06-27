import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { SignalRProvider } from '@/services/signalr';
import { SessionPage } from './pages/Session.page';
import {NewSessionPage} from "@/pages/NewSession";
import {JoinSessionPage} from "@/pages/JoinSessionPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/session',
    element: (
        <SignalRProvider hubUrl="https://washing-machine-fgfmdbd7bhgqhmdz.ukwest-01.azurewebsites.net/sessionHub" autoConnect={true}>
          <SessionPage />
        </SignalRProvider>
    ),
  },
  {
    path: '/session/new',
    element: <NewSessionPage />
  },
  {
    path: '/session/join',
    element: <JoinSessionPage />
  },
  {
    path: '/session/:sessionId/join',
    element: <JoinSessionPage />
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
