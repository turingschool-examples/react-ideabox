import { useState, useEffect } from 'react';
import Ideas from '../Ideas/Ideas';
import Form from '../Form/Form';
import './App.css';

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState('')

  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIdea), 
    })
    .then(response => response.json())
    .then(data => setIdeas([...ideas, data]))
    .catch(error => setError(error.message)) 
  }

  const deleteIdea = (id) => {
    const filteredIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(filteredIdeas);
  };

  function getIdeas() {
    fetch('http://localhost:3001/api/v1/ideas')
    .then(response => response.json())
    .then(data => setIdeas([...ideas, ...data]))
    .catch(error => {
      console.log(error)
      setError('Oops! Something went wrong! Please try again in a couple minutes.')
    })
  }

  useEffect(() => {
    getIdeas();
  }, [])

  return (
    <main className='App'>
      <h1>IdeaBox</h1>
      <Form addIdea={addIdea} />
      {error && <h2>{error}</h2>}
      <Ideas ideas={ideas} deleteIdea={deleteIdea} />
    </main>
  );
}
