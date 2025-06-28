import { Paper, Title } from '@mantine/core';

export function Estimates() {
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
            <Title>Estimates</Title>
        </Paper>
    );
}