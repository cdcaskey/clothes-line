import { Paper, Title } from '@mantine/core';

interface StageProps {
  name: string;
  sessionId: string;
  sessionType?: string;
}

export function Stage({ sessionId }: StageProps) {
  return (
    <Paper
      p="xl"
      shadow="md"
      radius="md"
      withBorder
    >
      <Title>Session {sessionId}</Title>
    </Paper>
  );
}