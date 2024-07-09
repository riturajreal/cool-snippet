'use client'
import CodeEditor from "@/components/CodeEditor";
import LanguageSelector from "@/components/LanguageSelector";
import { languages } from "@/utils/utitlities";
import { useState } from "react";

export default function Home() {

  const [language, setLanguage] = useState(languages[0].name);

  return (
    <main>
      <header>
        <LanguageSelector/>
      </header>
      <div className="code_editor_ref">
        <CodeEditor language={language}/>
      </div>
    </main>
  );
}
