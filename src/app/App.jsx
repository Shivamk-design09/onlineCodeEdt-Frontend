import './App.css'
import { Editor } from '@monaco-editor/react' // Monaco editor use karna ka component hai  // vscode jesa editor browser me hai
import { MonacoBinding } from 'y-monaco' // connect yjs to monaco editor  //
import { useEffect, useMemo, useRef, useState } from 'react'
import * as Y from 'yjs'
import { SocketIOProvider } from 'y-socket.io' // recived and send the changes with the server to show the users what are changed

function App() {
  const editorRef = useRef(null)
  const [username, setusername] = useState(() => {
    return new URLSearchParams(window.location.search).get('username') || ''
  }) // now make a function to get username form URL address

  // const params = new URLSearchParams(window.location.search)
  // useEffect(()=>{
  //   setusername(params.get())
  // },[params])

  // ydock is something where our code changes save and when user changes the code from Frontend it only change the new code add/removed and then server show this changes to other user also
  // ydoc = stores multiple files in form of key and value  in single object
  // Shared code is stored inside Y.Doc
  // every user will edit this doc only
  const ydoc = useMemo(() => new Y.Doc(), [])

  // Y.Doc se "monaco" naam ka shared text object le rahe hain
  const yText = useMemo(() => ydoc.getText('monaco'), [ydoc])

  const handleMount = (editor) => {
    editorRef.current = editor
  }


  // we are making a function to handle users
  // on submit this handler will run
  const handleJoin = (e) => {
    e.preventDefault()
    setusername(e.target.username.value)

    window.history.pushState({}, '', '?username=' + e.target.username.value) // method lets you add a new browser history wihtuot reloading the page
  }

  useEffect(() => {
    if (username && editorRef.current) {
    }
  }, [username, editorRef.current])

  if (!username) {
    return (
      <main className="bg-gray-950 w-[100%] flex h-screen gap-1 p-2 items-center justify-center">
        <form onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 rounded-lg bg-gray-500 text-white"
            name="username" // the name attribute addentifed as a unique idenfier for your data
          />
          <button className="p-2 w-20 rounded-lg bg-amber-500 text-gray-200 m-2">
            join
          </button>
        </form>
      </main>
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
