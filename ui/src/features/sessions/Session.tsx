import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Stage} from "./components/Stage.tsx";
import {Box, Grid, Stack} from "@mantine/core";
import {Estimates} from "./components/Estimates.tsx";
import {Explanation} from "./components/Explanation.tsx";

export function SessionPage() {
    const params = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") || "";
    const sessionType = searchParams.get("sessionType") || undefined;

    useEffect(() => {
        if (!name) {
            navigate(`/session/${params.sessionId}/join`);
            return;
        }
    }, [name, params.sessionId, navigate]);

    // Don't render until we have the required data
    if (!name || !params.sessionId) {
        return null; // Render nothing while redirecting
    }

    return (
        <Box p="md">
                {/* Desktop and tablet layout */}
                <Box visibleFrom="md" className="desktop-grid">
                    <Grid gutter="md" mb="md">
                        <Grid.Col span={7}>
                            <Stage name={name} sessionId={params.sessionId} sessionType={sessionType} />
                        </Grid.Col>
                        <Grid.Col span={5}>
                            <Estimates/>
                        </Grid.Col>
                    </Grid>
                    <Explanation/>
                </Box>

                {/* Mobile layout */}
                <Stack hiddenFrom="md" className="mobile-stack">
                    <Stage name={name} sessionId={params.sessionId} sessionType={sessionType} />
                    <Estimates/>
                    <Explanation/>
                </Stack>
        </Box>
    );
}