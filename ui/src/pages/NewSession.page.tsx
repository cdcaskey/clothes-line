import { useState, useEffect } from 'react';
import {TextInput, Select, Checkbox, Button, Stack, Title, Paper, Group, Text, Menu} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Label = Menu.Label;

export function NewSessionPage() {
    const [name, setName] = useState('');
    const [sessionType, setSessionType] = useState('');
    const [saveName, setSaveName] = useState(false);
    const navigate = useNavigate();

    // Load name from localStorage on component mount if available
    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
            setSaveName(true);
        }
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Save name to localStorage if checkbox is checked
        if (saveName) {
            localStorage.setItem('userName', name);
        } else {
            localStorage.removeItem('userName');
        }

        // Navigate to session page
        navigate('/session');
    };

    return (
        <Stack gap="lg" p="md">
            <Title order={1}>New Session</Title>

            <Paper p="md" withBorder radius="md" shadow="sm">
                <form onSubmit={handleSubmit}>
                    <Stack gap="md">
                        <TextInput
                            label="Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) => setName(event.currentTarget.value)}
                            required
                        />

                        <Select
                            label="Session Type"
                            placeholder="Select session type"
                            data={[
                                { value: 'planning', label: 'Planning' },
                                { value: 'retrospective', label: 'Retrospective' },
                                { value: 'discussion', label: 'Discussion' }
                            ]}
                            value={sessionType}
                            onChange={(value) => setSessionType(value || '')}
                            required
                        />

                        <Stack>
                        <Checkbox
                            label="Save Name"
                            checked={saveName}
                            onChange={(event) => setSaveName(event.currentTarget.checked)}
                        />

                            <Text c="dimmed">                            Checking this box will save your name to localStorage on this device. It isn't shared with any other party, including your other browsers.</Text>
                        </Stack>

                        <Group justify="flex-end">
                            <Button type="submit">Create Session</Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
}
