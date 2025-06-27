/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: Error) => void
  }

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}

declare module 'virtual:pwa-assets' {
  export interface PwaAssets {
    name: string
    short_name: string
    description: string
    theme_color: string
    background_color: string
    display: string
    orientation: string
    scope: string
    start_url: string
    icons: Array<{
      src: string
      sizes: string
      type: string
      purpose?: string
    }>
    shortcuts?: Array<{
      name: string
      short_name: string
      description: string
      url: string
      icons?: Array<{
        src: string
        sizes: string
      }>
    }>
  }

  export const pwaAssets: PwaAssets
}
