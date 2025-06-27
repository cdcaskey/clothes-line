import { useEffect, useState } from 'react';
import { useSignalR } from './signalRContext';

export function useSignalRMethod<T>(
  methodName: string,
  initialData?: T
): { data: T | undefined; error: Error | null } {
  const { connection, connected } = useSignalR();
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!connection || !connected) {
      return;
    }

    const handleData = (receivedData: T) => {
      setData(receivedData);
      setError(null);
    };

    connection.on<T>(methodName, handleData);

    return () => {
      connection.off(methodName);
    };
  }, [connection, connected, methodName]);

  return { data, error };
}
