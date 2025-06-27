import {Text, Title} from "@mantine/core";
import { useParams } from 'react-router-dom';

export function SessionPage() {
    const params = useParams<{ sessionId: string }>();

    return (
        <>
            <Title ta="center" mt={100}>
                Welcome to session{' '}
                <Text inherit variant="gradient" component="span" gradient={{ from: 'dodgerBlue', to: 'blue' }}>
                    {params.sessionId}
                </Text>
            </Title>
        </>
    );
}