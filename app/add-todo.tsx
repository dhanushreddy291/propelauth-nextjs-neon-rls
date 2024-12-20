"use server";

import { insertTodo } from "@/app/actions";
import styles from "../styles/Home.module.css";

export async function insertTodoFormAction(formData: FormData) {
  const newTodo = formData.get("newTodo");

  if (!newTodo) {
    throw new Error("No newTodo");
  }

  if (typeof newTodo !== "string") {
    throw new Error("The newTodo must be a string");
  }

  return insertTodo({ newTodo: newTodo.toString() });
}

export async function AddTodoForm() {
  return (
    <form className={styles.formContainer} action={insertTodoFormAction}>
      <input
        required
        name="newTodo"
        className={styles.input}
        placeholder="What needs to be done?"
      />
      <button className={`${styles.btn} ${styles.addBtn}`} type="submit">
        Add Todo
      </button>
    </form>
  );
}