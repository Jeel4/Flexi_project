  // frontend/components/QuoteList.js
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  
  function QuoteList() {
      const [quotes, setQuotes] = useState([]);
  
      useEffect(() => {
          const fetchQuotes = async () => {
              const res = await axios.get('http://localhost:5000/api/quotes');
              setQuotes(res.data);
          };
          fetchQuotes();
      }, []);
  
      return (
          <div>
              <h2>Quotes List</h2>
              {quotes.length > 0 ? (
                  quotes.map((quote) => (
                      <div key={quote._id}>
                          <p>"{quote.text}" - {quote.author}</p>
                      </div>
                  ))
              ) : (
                  <p>No quotes available</p>
              )}
          </div>
      );
  }
  
  export default QuoteList;