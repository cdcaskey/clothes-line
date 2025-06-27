import { useEffect, useState } from 'react';
import { Button, Group, Stack, Text, TextInput, Title, Code, Alert } from '@mantine/core';
import { useSignalR, useSignalRInvoke, useSignalRMethod } from '@/services/signalr';

type Message = {
  sender: string;
  content: string;
  timestamp: string;
};

export function SignalRExample() {
  const { connected, connecting, connectionError } = useSignalR();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(`User_${Math.floor(Math.random() * 10000)}`);
  const [messages, setMessages] = useState<Message[]>([]);

  // Subscribe to receive messages
  const { data: newMessage } = useSignalRMethod<Message>('ReceiveMessage');

  // Method to send messages
  const { invoke: sendMessage, loading: sendingMessage } = useSignalRInvoke<void, [string, string]>('SendMessage');

  // Add new messages when they come in
  useEffect(() => {
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(username, message);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Stack spacing="md" p="md">
      <Title order={2}>SignalR Chat Example</Title>

      {connectionError && (
        <Alert color="red" title="Connection Error">
          {connectionError.message}
        </Alert>
      )}

      <Group>
        <Text>{connected ? '✅ Connected' : connecting ? '⏳ Connecting...' : '❌ Disconnected'}</Text>
        <Code>{connected ? 'Connected to SignalR hub' : 'Not connected'}</Code>
      </Group>

      <TextInput
        label="Your Name"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        disabled={sendingMessage}
      />

      <Stack spacing="xs" style={{ height: '300px', overflowY: 'auto', border: '1px solid #eee', padding: '10px' }}>
        {messages.length === 0 ? (
          <Text c="dimmed" ta="center" pt="xl">No messages yet. Start chatting!</Text>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Text size="sm" fw={700}>{msg.sender}</Text>
              <Text size="sm">{msg.content}</Text>
              <Text size="xs" c="dimmed">{new Date(msg.timestamp).toLocaleTimeString()}</Text>
            </div>
          ))
        )}
      </Stack>

      <Group>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          style={{ flex: 1 }}
          disabled={!connected || sendingMessage}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          onClick={handleSendMessage} 
          loading={sendingMessage}
          disabled={!connected || !message.trim()}
        >
          Send
        </Button>
      </Group>
    </Stack>
  );
}
