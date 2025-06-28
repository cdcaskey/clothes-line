import { Paper, Title, Text } from '@mantine/core';

interface StageProps {
  name: string;
  sessionId: string;
  sessionType?: string;
}

  export function Stage({ name, sessionId, sessionType }: StageProps) {
  return (
    <Paper
      p="xl"
      shadow="md"
      radius="md"
      withBorder
    >
      <Title>Session {sessionId}</Title>
      {name && <Text>Participant: {name}</Text>}
      {sessionType && <Text>Type: {sessionType}</Text>}
    </Paper>
  );
}