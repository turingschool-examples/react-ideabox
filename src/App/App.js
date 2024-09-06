import { useState } from 'react';
import Ideas from '../Ideas/Ideas';
import Form from '../Form/Form';
import './App.css';

export default function App() {
  const [ideas, setIdeas] = useState([]);

  function addIdea(newIdea) {
    setIdeas([...ideas, newIdea]);
  };

  const deleteIdea = (id) => {
    const filteredIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(filteredIdeas);
  };

  return (
    <main className='App'>
      <h1>IdeaBox</h1>
      <Form addIdea={addIdea} />
      {!ideas.length && <p>Hmm...it feels empty in here. Let's add some ideas!</p>}
      <Ideas ideas={ideas} deleteIdea={deleteIdea} />
    </main>
  );
}
