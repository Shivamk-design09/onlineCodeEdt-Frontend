import './App.css'
import { Editor } from '@monaco-editor/react' // Monaco editor use karna ka component hai  // vscode jesa editor browser me hai
import { MonacoBinding } from 'y-monaco' // connect yjs to monaco editor  // 
import { useEffect, useMemo, useRef } from 'react'
import * as Y from 'yjs'
import { SocketIOProvider } from 'y-socket.io'

function App() {
  const editorRef = useRef(null)

  // ydock is something where our code changes save and when user changes the code from Frontend it only change the new code add/removed and then server show this changes to other user also
  // ydoc = storea multiple files in form of key and value  in single object

  // everycode is saving in Ydoc
  const ydoc = useMemo(() => new Y.Doc(), [])

  //get the file name by get text and
  const ytext = useMemo(() => ydoc.getText('monaco'), [ydoc])

  console.log(ydoc)
  console.log(ytext)

  const handleEditor = (editor) => {
    editorRef.current = editor

    const provider = new SocketIOProvider(
      'http://localhost:3000',
      'monaco',
      ydoc,
    )

    // monacobinding me jo type hota h use yjs document me sync karta h
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness,
    )
  }

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
