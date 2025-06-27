import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '@/components/Welcome/Welcome';
import {Text} from "@mantine/core";

export function NewSessionPage() {
    return (
        <>
            <Text>New Session</Text>
            <Welcome />
        </>
    );
}
