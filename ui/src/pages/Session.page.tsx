import { useEffect } from 'react';
import { Stack, Title, Text, Alert, Button } from '@mantine/core';
import { useSignalR, useSignalRMethod } from '@/services/signalr';

type SessionUpdate = {
  id: string;
  status: string;
  lastUpdate: string;
};

export function SessionPage() {
  const { connected, connecting, connectionError } = useSignalR();

  // Subscribe to session updates
  const { data: sessionUpdate } = useSignalRMethod<SessionUpdate>('ReceiveSessionUpdate');

  useEffect(() => {
    if (sessionUpdate) {
      console.log('Session update received:', sessionUpdate);
    }
  }, [sessionUpdate]);

  return (
    <Stack p="md">
      <Title order={1}>Session Page</Title>

      {connectionError && (
        <Alert color="red" title="Connection Error">
          {connectionError.message}
        </Alert>
      )}

      <Text fw={500}>
        SignalR Status: {connected ? '✅ Connected' : connecting ? '⏳ Connecting...' : '❌ Disconnected'}
      </Text>

      {sessionUpdate && (
        <Stack p="md" bg="gray.1" style={{ borderRadius: '8px' }}>
          <Text fw={700}>Session ID: {sessionUpdate.id}</Text>
          <Text>Status: {sessionUpdate.status}</Text>
          <Text size="sm" c="dimmed">Last Updated: {new Date(sessionUpdate.lastUpdate).toLocaleString()}</Text>
        </Stack>
      )}

      {!sessionUpdate && connected && (
        <Text c="dimmed">Waiting for session updates...</Text>
      )}

      <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
    </Stack>
  );
}
