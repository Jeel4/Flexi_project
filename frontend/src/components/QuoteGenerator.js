import React, { useState, useEffect } from 'react'; 

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a new quote from the backend API
  const fetchQuote = () => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/quotes') // Ensure correct backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        setQuote(data); // Set the received quote to state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
        setError('Oops! Something went wrong. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote(); // Fetch quote when component mounts
  }, []); // Empty array ensures it only fetches once on mount

  return (
    <div className="quote-generator" id="quote-generator-container">
      <button className="generate-button" id="generate-quote-btn" onClick={fetchQuote}>
        Generate New Quote
      </button>
      {loading && <p className="loading-text" id="loading-text">Loading...</p>}
      {error && <p className="error-message" id="error-message">{error}</p>}
      {quote && !loading && !error && (
        <div className="quote-display" id="quote-display">
          <p className="quote-text" id="quote-text">"{quote.text}"</p>
          {quote.author && <p className="quote-author" id="quote-author">- {quote.author}</p>}
          {quote.imageUrl && <img src={quote.imageUrl} alt="Quote" className="quote-image" id="quote-image" />}
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;
