"use server";

import { fetchWithDrizzle } from "@/app/db";
import * as schema from "@/app/schema";
import { Todo } from "@/app/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function insertTodo({ newTodo }: { newTodo: string }) {
  await fetchWithDrizzle(async (db) => {
    return db.insert(schema.todos).values({
      task: newTodo,
      isComplete: false,
    });
  });

  revalidatePath("/");
}

export async function getTodos(): Promise<Array<Todo>> {
  return fetchWithDrizzle(async (db, { userId }) => {
    // WHERE filter is optional because of RLS. But we send it anyway for
    // performance reasons.
    return db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.userId, userId))
      .orderBy(schema.todos.isComplete)
  });
}

export async function deleteTodo({ id }: { id: string }) {
  await fetchWithDrizzle(async (db) => {
    return db
      .delete(schema.todos)
      .where(eq(schema.todos.id, BigInt(id)));
  });

  revalidatePath("/");
};

export async function toggleTodo({ id }: { id: string }) {
  await fetchWithDrizzle(async (db) => {
    const [existing] = await db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, BigInt(id)))
      .limit(1);

    if (existing) {
      await db
        .update(schema.todos)
        .set({ isComplete: !existing.isComplete })
        .where(eq(schema.todos.id, BigInt(id)));
    }
  });
  revalidatePath("/");
}