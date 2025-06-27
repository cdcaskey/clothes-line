# Mantine Vite template
# SignalR React Client

This project demonstrates how to integrate SignalR in a React TypeScript application.

## Getting Started

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

## SignalR Integration

This project uses `@microsoft/signalr` for real-time communication with a SignalR hub.

### Key Components

- `SignalRConnection`: Core class for managing the SignalR connection
- `SignalRProvider`: React context provider for the SignalR connection
- `useSignalRMethod`: Hook for subscribing to SignalR hub methods
- `useSignalRInvoke`: Hook for invoking methods on the SignalR hub

### Usage Example

```tsx
import { useSignalR, useSignalRInvoke, useSignalRMethod } from '@/services/signalr';

function ChatComponent() {
  // Get connection status
  const { connected } = useSignalR();

  // Subscribe to a hub method
  const { data: newMessage } = useSignalRMethod('ReceiveMessage');

  // Set up a method to invoke on the hub
  const { invoke: sendMessage, loading } = useSignalRInvoke('SendMessage');

  const handleSend = async () => {
    await sendMessage('username', 'message content');
  };

  return (
    <div>
      <p>Connection status: {connected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={handleSend} disabled={loading || !connected}>
        Send Message
      </button>
    </div>
  );
}
```

## Configuration

You can configure the SignalR hub URL in the `App.tsx` file:

```tsx
<SignalRProvider hubUrl="/hub">
  {/* Your app components */}
</SignalRProvider>
```

## Backend Requirements

This client expects a SignalR hub to be available at the configured URL. The hub should implement the following methods:

- `SendMessage(sender, content)`: Method to send a message
- `ReceiveMessage`: Method that the server calls to send messages to clients

## License

MIT
## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
