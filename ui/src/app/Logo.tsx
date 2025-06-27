import { Group, Text } from '@mantine/core';

export function Logo() {
    return (
        <Group>
            <Text size="xl" fw="700" variant="gradient" component="span" gradient={{ from: 'dodgerblue', to: 'blue' }}>
                <span className="material-symbols-outlined">dry_cleaning</span>
                Clothes Line
            </Text>
        </Group>
    );
}