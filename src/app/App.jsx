import './App.css'
import { Editor } from '@monaco-editor/react'

function App() {
  return (
    <main className="bg-gray-950 w-full flex h-screen gap-1 p-2">
      <aside className="h-full w-1/4 bg-amber-50 rounded-lg"></aside>

      <section className="w-3/4 bg-neutral-950 rounded-md">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
        />
      </section>
    </main>
  )
}

export default App
