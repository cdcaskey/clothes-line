import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SignalRConnection } from './signalRConnection';

interface SignalRContextType {
  connection: SignalRConnection | null;
  connected: boolean;
  connecting: boolean;
  connectionError: Error | null;
}

const SignalRContext = createContext<SignalRContextType>({
  connection: null,
  connected: false,
  connecting: false,
  connectionError: null,
});

interface SignalRProviderProps {
  hubUrl: string;
  children: ReactNode;
  autoConnect?: boolean;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({
  hubUrl,
  children,
  autoConnect = true,
}) => {
  const [connection, setConnection] = useState<SignalRConnection | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<Error | null>(null);

  useEffect(() => {
    const signalRConnection = new SignalRConnection(hubUrl);
    setConnection(signalRConnection);

    return () => {
      signalRConnection.stop().catch(console.error);
    };
  }, [hubUrl]);

  useEffect(() => {
    if (connection && autoConnect && !connected && !connecting) {
      const connectToHub = async () => {
        try {
          setConnecting(true);
          setConnectionError(null);
          await connection.start();
          setConnected(true);
        } catch (error) {
          setConnectionError(error instanceof Error ? error : new Error(String(error)));
          console.error('Failed to connect to SignalR hub:', error);
        } finally {
          setConnecting(false);
        }
      };

      connectToHub();
    }
  }, [connection, autoConnect, connected, connecting]);

  return (
    <SignalRContext.Provider
      value={{
        connection,
        connected,
        connecting,
        connectionError,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
