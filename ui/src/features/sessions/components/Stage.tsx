import { Paper, Title } from '@mantine/core';

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
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Title>Session {sessionId}</Title>
    </Paper>
  );
}