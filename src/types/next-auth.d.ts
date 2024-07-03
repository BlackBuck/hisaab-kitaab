import 'next-auth';
import { string } from 'zod';

declare module 'next-auth' {
    interface Session {
        user: {
            email?: string;
        } & DefaultSession['user'],
    }
}