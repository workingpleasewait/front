import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);
  const [sponsoredLinks, setSponsoredLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('https://back.workingpleasewa.repl.co/query', {
        query: query,
      });
      const links = showSponsoredLinks(query);
      setResponse([
        ...response,
        {
          query: query,
          reply: result.data.response || 'No response',
          sponsoredLinks: links,
        },
      ]);
      setSponsoredLinks([...sponsoredLinks, ...links]); // Update sponsored links state here
      setQuery('');
    } catch (error) {
      console.error('An error occurred:', error);
      setResponse([
        ...response,
        { query: query, reply: 'An error occurred while fetching the response' },
      ]);
    }
    setLoading(false);
  };

  const showSponsoredLinks = (query) => {
    const links = [];
    if (query.includes('car')) {
      links.push({ text: 'Car Ad 1', href: '#' });
      links.push({ text: 'Car Ad 2', href: '#' });
    }
    if (query.includes('bike')) {
      links.push({ text: 'Bike Ad 1', href: '#' });
      links.push({ text: 'Bike Ad 2', href: '#' });
    }
    return links;
  };

  return (
    <div className="App">
      <header>
        <h1>Searchless</h1>
      </header>
      <div className="content">
        <div className="chat-section">
          <div className="chat-window">
            {loading && <div>Loading...</div>}
            {response.map((item, index) => (
              <div key={index} className="message-section">
                <strong>User:</strong> {item.query}
                <br />
                <strong>AI:</strong> {item.reply}
              </div>
            ))}
          </div>
          <form onSubmit={handleChat}>
            <input type="text" placeholder="Enter your query here" value={query} onChange={handleQueryChange} />
            <button type="submit">Chat</button>
          </form>
        </div>
        <div className="sponsored-links">
          <h2>Sponsored Links for ChatGPT</h2>
          <div className="sponsored-links-box">
            {sponsoredLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>a work in progress</p>
      </footer>
    </div>
  );
}

export default App;
