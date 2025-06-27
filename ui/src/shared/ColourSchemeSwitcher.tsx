import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColourSchemeSwitcher() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <Group justify="center" mt="xl">
            { colorScheme == 'light' &&
                <Button onClick={() => setColorScheme('dark')}>
                    <span className="material-symbols-outlined">light_mode</span>
                </Button>
            }
            { colorScheme == 'dark' &&
                <Button onClick={() => setColorScheme('auto')}>
                    <span className="material-symbols-outlined">dark_mode</span>
                </Button>
            }
            { colorScheme == 'auto' &&
                <Button onClick={() => setColorScheme('light')}>
                    <span className="material-symbols-outlined">night_sight_auto</span>
                </Button>
            }
        </Group>
    );
}