import { Paper, Title, Text } from '@mantine/core';

export function Explanation() {
    return (
        <Paper
            p="xl"
            shadow="md"
            radius="md"
            withBorder
        >
            <Title order={3} mb="md">Explanation</Title>
            <Text>
                Planning poker.
                By me.
            </Text>
        </Paper>
    );
}