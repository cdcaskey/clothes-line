import {AppShell, Burger, Group, NavLink} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Logo} from "./Logo.tsx";
import {ColourSchemeSwitcher} from "../shared/ColourSchemeSwitcher.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" visibleFrom="sm">
                    <Logo />
                </Group>
                <Group h="100%" px="md" hiddenFrom="sm">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="center" style={{ flex: 1 }}>
                        <Logo />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <>
                    <NavLink
                        href="/"
                        label="Home"
                        leftSection={<span className="material-symbols-outlined">home</span>}
                    />
                    <NavLink
                        href="/session/new"
                        label="New Session"
                        leftSection={<span className="material-symbols-outlined">create</span>}
                    />
                    <NavLink
                        href="/session/join"
                        label="Join Session"
                        leftSection={<span className="material-symbols-outlined">groups</span>}
                    />
                    <NavLink
                        href="https://github.com/cdcaskey/Clothes-Line/issues/new?labels=enhancement"
                        label="Request Feature"
                        leftSection={<span className="material-symbols-outlined">delete</span>}
                    />
                    <ColourSchemeSwitcher />
                </>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}