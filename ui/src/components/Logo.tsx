import { Group, Text } from '@mantine/core';

export function Logo({ size = 30 }: { size?: number }) {
    return (
        <Group spacing="xs">
            <Text size="xl" fw="700" variant="gradient" component="span" gradient={{ from: 'dodgerblue', to: 'blue' }}>
                <span className="material-symbols-outlined">dry_cleaning</span>
                Clothes Line
            </Text>
        </Group>
    );
}
