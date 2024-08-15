import { load } from 'ts-dotenv';

export const envs = load({
    PORT: Number,
    APP_NAME: String,
});