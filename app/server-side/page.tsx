'use server';

import { neon } from '@neondatabase/serverless';
import { getUser, getAccessTokenAsync } from "@propelauth/nextjs/server/app-router";

export default async function TodoList() {
    const user = await getUser();
    if (!user) {
        throw new Error('No user');
    }

    const jwt = await getAccessTokenAsync();

    const sql = neon(process.env.DATABASE_AUTHENTICATED_URL!, {
        authToken: async () => {
            if (!jwt) {
                throw new Error('No JWT token available');
            }
            return jwt;
        },
    });

    // WHERE filter is optional because of RLS.
    // But we send it anyway for performance reasons.
    const todos = await
        sql('SELECT * FROM todos WHERE user_id = auth.user_id()');

    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>{todo.task}</li>
            ))}
        </ul>
    );
}