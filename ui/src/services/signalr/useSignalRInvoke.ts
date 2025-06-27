import { useState, useCallback } from 'react';
import { useSignalR } from './signalRContext';

export function useSignalRInvoke<TResult = void, TParams extends any[] = any[]>(
  methodName: string
): {
  invoke: (...args: TParams) => Promise<TResult>;
  loading: boolean;
  error: Error | null;
  result: TResult | null;
} {
  const { connection, connected } = useSignalR();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<TResult | null>(null);

  const invoke = useCallback(
    async (...args: TParams): Promise<TResult> => {
      if (!connection) {
        const connectionError = new Error('SignalR connection is not initialized');
        setError(connectionError);
        throw connectionError;
      }

      if (!connected) {
        const connectionError = new Error('SignalR connection is not established');
        setError(connectionError);
        throw connectionError;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await connection.invoke<TResult>(methodName, ...args);
        setResult(response);
        return response;
      } catch (err) {
        const invokeError = err instanceof Error ? err : new Error(String(err));
        setError(invokeError);
        throw invokeError;
      } finally {
        setLoading(false);
      }
    },
    [connection, connected, methodName]
  );

  return { invoke, loading, error, result };
}
