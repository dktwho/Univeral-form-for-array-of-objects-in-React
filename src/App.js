import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import { initNotes } from './data';

function App() {
  const [notes, setNotes] = useState(initNotes)
  const [obj, setObj] = useState(getInitObj())
  const [editId, setEditId] = useState(null)

  function getInitObj() {
    return {
      id: nanoid(),
      prop1: '',
      prop2: '',
      prop3: '',
    }
  }

  const result = notes.map((note) => {
    return <p key={note.id}>
      <span>{note.prop1}</span>
      <span>{note.prop2}</span>
      <span>{note.prop3}</span>
      <button onClick={() => setEditId(note.id)}>edit</button>
    </p>
  })

  function getValue(prop) {
    if(editId) {
      return notes.reduce((res, note) => note.id === editId ? note[prop] : res, '')
    } else {
      return obj[prop]
    }
  }

  function changeItem(prop, event) {
    if(editId) {
      setNotes(notes.map((note) => note.id === editId ? {...note, [prop]: event.target.value} : note))
    } else {
      setObj({...obj, [prop]: event.target.value})
    }
  }

  function saveItem() {
    if(editId) {
      setEditId(null)
    } else {
      setNotes([...notes, obj])
      setObj(getInitObj())
    }
  }
  return (
    <div className="App">
      {result}
      <input type="text" value={getValue('prop1')}  onChange={(e) => changeItem('prop1', e,)} /> <br />
      <input type="text" value={getValue('prop2')}  onChange={(e) => changeItem('prop2', e,)} /> <br /> 
      <input type="text" value={getValue('prop3')}  onChange={(e) => changeItem('prop3', e,)} /> <br />
      <button onClick={saveItem}>save</button>
    </div>
  );
}

export default App;
