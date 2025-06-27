import {createBrowserRouter, createHashRouter, RouterProvider} from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { SignalRProvider } from '@/services/signalr';
import { SessionPage } from './pages/Session.page';
import {NewSessionPage} from "@/pages/NewSession.page";
import {JoinSessionPage} from "@/pages/JoinSession.page";

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/session/:sessionId',
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
