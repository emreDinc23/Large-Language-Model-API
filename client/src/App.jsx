import styles from "./styles.module.css";
import herkezİMG from "./assets/Herkez.png";
import { useState } from "react";

export default function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3002/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: userPrompt }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={herkezİMG} className={styles.icon} alt="HerkeZ Hata Yapabilir" />
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.textareaContainer}>
          <textarea
            name="query-description"
            placeholder="Düzenlenecek metni girin"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className={styles.textarea}
            rows={20}
          />
          <textarea
            
            value={sqlQuery}
            readOnly // ReadOnly olarak işaretlenmiş
            className={styles.textarea}
            rows={20}
            
          />
        </div>
        <input type="submit" value="Yazım Düzenle" className={styles.button} />
      </form>
    </main>
  );
}
