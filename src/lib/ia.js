import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter ({
    apiKey: import.meta.env.VITE_OPENROUETER_KEY
});