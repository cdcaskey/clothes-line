import { useParams, useSearchParams } from 'react-router-dom';
import {Stage} from "./components/Stage.tsx";
import {Box, Grid, Stack} from "@mantine/core";
import {Estimates} from "./components/Estimates.tsx";
import {Explanation} from "./components/Explanation.tsx";

export function SessionPage() {
    const params = useParams<{ sessionId: string }>();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") || "Anonymous";
    const sessionType = searchParams.get("sessionType") || undefined;

    if (!params.sessionId) {
        throw Error("Session ID is required");
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