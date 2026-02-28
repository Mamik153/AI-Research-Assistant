// Centralized environment configuration
// All env variable access should go through this module

export const config = {
    /** Whether to use the dynamic structured-UI research endpoint */
    useDynamicUI: import.meta.env.VITE_USE_DYNAMIC_UI === 'true',
} as const;
