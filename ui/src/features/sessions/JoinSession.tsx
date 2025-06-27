import { useState, useEffect } from 'react';
import { TextInput, Checkbox, Button, Stack, Title, Paper, Group, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

export function JoinSessionPage() {
    const [sessionId, setSessionId] = useState('');
    const [name, setName] = useState('');
    const [saveName, setSaveName] = useState(false);
    const navigate = useNavigate();
    const params = useParams<{ sessionId: string }>();

    // Check if session ID is provided in URL path
    const isSessionIdFromPath = !!params.sessionId;

    // Load session ID from URL parameters if available
    useEffect(() => {
        if (params.sessionId) {
            setSessionId(params.sessionId);
        }
    }, [params.sessionId]);

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

        // Validate that we have a session ID
        if (!sessionId.trim()) {
            alert('Please enter a valid Session ID');
            return;
        }

        // Save name to localStorage if checkbox is checked
        if (saveName) {
            localStorage.setItem('userName', name);
        } else {
            localStorage.removeItem('userName');
        }

        // Navigate to session page with the session ID
        navigate(`/session/${sessionId}`);
    };

    return (
        <Stack gap="lg" p="md">
            <Title order={1}>Join Session</Title>

            <Paper p="md" withBorder radius="md" shadow="sm">
                <form onSubmit={handleSubmit}>
                    <Stack gap="md">
                        <TextInput
                            label="Session ID"
                            placeholder="Enter session ID"
                            value={sessionId}
                            onChange={(event) => setSessionId(event.currentTarget.value)}
                            disabled={isSessionIdFromPath}
                            required
                        />

                        <TextInput
                            label="Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) => setName(event.currentTarget.value)}
                            required
                        />

                        <Stack>
                            <Checkbox
                                label="Save Name"
                                checked={saveName}
                                onChange={(event) => setSaveName(event.currentTarget.checked)}
                            />
                            <Text c="dimmed">
                                Checking this box will save your name to local storage on this device.
                                It isn't shared with any other party, including your other browsers.
                            </Text>
                        </Stack>

                        <Group justify="flex-end">
                            <Button type="submit">Join Session</Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
}