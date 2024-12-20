"use server";

import { getTodos } from "@/app/actions";
import TodoListClient from "@/app/todo-list.client";

export async function TodoList() {
  const todos = await getTodos();
  return <TodoListClient todos={todos} />;
}
