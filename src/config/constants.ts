export const CONFIG = {
    API:{
        TFL_BASE_URL: import.meta.env.VITE_TFL_API_BASE_URL ||
        'https://api.tfl.gov.uk',
            TIMEOUT: 10000,
    }
} as const