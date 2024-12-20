'use client';

import type { Todo } from '@/app/schema';
import { neon } from '@neondatabase/serverless';
import { useUser } from "@propelauth/nextjs/client";
import { useEffect, useState } from 'react';

const getDb = (token: string) =>
    neon(process.env.NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL!, {
        authToken: token,
    });

export default function TodoList() {
    const { accessToken } = useUser();
    const [todos, setTodos] = useState<Array<Todo>>();

    useEffect(() => {
        async function loadTodos() {
            if (!accessToken) {
                return;
            }

            const sql = getDb(accessToken);

            // WHERE filter is optional because of RLS.
            // But we send it anyway for performance reasons.
            const todosResponse = await
                sql('select * from todos where user_id = auth.user_id()');

            setTodos(todosResponse as Array<Todo>);
        }

        loadTodos();
    }, [accessToken]);

    return (
        <ul>
            {todos?.map((todo) => (
                <li key={todo.id}>
                    {todo.task}
                </li>
            ))}
        </ul>
    );
}