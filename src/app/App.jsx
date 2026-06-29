import './App.css'
import { Editor } from '@monaco-editor/react' // Monaco editor use karna ka component hai  // vscode jesa editor browser me hai
import { MonacoBinding } from 'y-monaco' // connect yjs to monaco editor  //
import { useEffect, useMemo, useRef } from 'react'
import * as Y from 'yjs'
import { SocketIOProvider } from 'y-socket.io' // recived and send the changes with the server to show the users what are changed

function App() {
  const editorRef = useRef(null)

  // ydock is something where our code changes save and when user changes the code from Frontend it only change the new code add/removed and then server show this changes to other user also
  // ydoc = stores multiple files in form of key and value  in single object
  // Shared code is stored inside Y.Doc
  // every user will edit this doc only
  const ydoc = useMemo(() => new Y.Doc(), [])

  // Y.Doc se "monaco" naam ka shared text object le rahe hain
  const yText = useMemo(() => ydoc.getText('monaco'), [ydoc])

  const handleMount = (editor) => {
    editorRef.current = editor

    // make the connection between in client and server -- ydoc connect to secket.io server
    // make a provider to connect the frontend editor to with server
    // so that frontend changes reaches to the server and it shows to other user also
    const provider = new SocketIOProvider(
      'http://localhost:3000',
      'monaco',
      ydoc,
      { autoConnect: true },
    )

    // bridge between in monaco editr and yjs
    // editor and Y.doc dono ko sync karta h
    // user type in editor then y.doc gets updated, hence Y.doc get updated then editor also get updated
    // monacobinding me jo type hota h use yjs document me sync karta h
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(), // monaco editor ka model
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
          onMount={handleMount}
        />
      </section>
    </main>
  )
}

export default App
