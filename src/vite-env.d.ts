/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROUTER_MODE?: 'history' | 'hash';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
