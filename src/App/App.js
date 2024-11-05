import { useState, useEffect } from 'react';
import Ideas from '../Ideas/Ideas';
import Form from '../Form/Form';
import './App.css';

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    getIdeas();
  }, [])

  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIdea), 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status); 
      }
      return response.json()
    })    .then(data => setIdeas([...ideas, data]))
    .catch(error => {
      console.log(error)
      setError('Oops! Something went wrong! Please check that you\'ve filled out all the fields.')
    })
  }

  const deleteIdea = (id) => {
    fetch(`http://localhost:3001/api/v1/ideas/${id}`, {
      method: 'DELETE'
    })
    .then(data => {
      const filteredIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(filteredIdeas);
    })
    .catch(error => {
      console.log(error)
      setError('Oops! Something went wrong! Please try again in a couple minutes.')
    }) 
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

  return (
    <main className='App'>
      <h1>IdeaBox</h1>
      <Form addIdea={addIdea} />
      {error && <h2>{error}</h2>}
      <Ideas ideas={ideas} deleteIdea={deleteIdea} />
    </main>
  );
}
