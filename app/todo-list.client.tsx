"use client";

import styles from "../styles/Home.module.css";
import { deleteTodo, toggleTodo } from "@/app/actions";
import { Todo } from "@/app/schema";

export default function TodoListClient({ todos }: { todos: Array<Todo> }) {
    if (!todos) {
        return <div className={styles.label}>Loading...</div>;
    }

    return (
        <>
            {todos.length > 0 ? (
                <div className={styles.container}>
                    <ol className={styles.todoList}>
                        {todos.map((todo) => (
                            <li key={todo.id} className={styles.todoItem}>
                                <span className={`${styles.todoText} ${todo.isComplete ? styles.strike : ""}`}>
                                    {todo.task}
                                </span>
                                <button
                                    className={`${styles.btn} ${todo.isComplete ? styles.completeBtn : ''}`}
                                    onClick={() => toggleTodo({ id: todo.id.toString() })}
                                >
                                    {todo.isComplete ? "Add again" : "Complete"}
                                </button>
                                <button
                                    className={`${styles.btn} ${styles.deleteBtn}`}
                                    onClick={() => deleteTodo({ id: todo.id.toString() })}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            ) : (
                <div className={styles.label}>You don&apos;t have any todos!</div>
            )}
        </>
    );
}