import { AddTodoForm } from "@/app/add-todo";
import { Header } from "@/app/header";
import { TodoList } from "@/app/todo-list";
import { getUser } from "@propelauth/nextjs/server/app-router";

import styles from "../styles/Home.module.css";

export default async function Home() {
  const user = await getUser();

  let content = (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>
          Please <a href="/api/auth/login" style={{ color: "green" , textDecoration: "underline" }}>login</a> or <a href="/api/auth/signup" style={{ color: "green" , textDecoration: "underline" }}>signup</a> to use the app
        </h1>
      </div>
    </main>
  )
  if (user) {
    content = (
      <main className={styles.main}>
        <div className={styles.container}>
          <AddTodoForm />
          <TodoList />
        </div>
      </main>
    );
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
}
