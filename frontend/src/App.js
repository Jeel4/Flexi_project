import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AddQuote from './components/AddQuote';
import QuoteList from './components/QuoteList';
import QuoteGenerator from './components/QuoteGenerator';

function App() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetching the quote once when the component mounts
    useEffect(() => {
        fetch('http://localhost:5000/api/quote')  // Backend API endpoint
            .then((response) => response.json())
            .then((data) => {
                setQuote(data);  // Store the fetched quote
                setLoading(false);  // Set loading to false once the quote is fetched
            })
            .catch((error) => {
                console.error('Error fetching quote:', error);
                setLoading(false);  // Set loading to false even if there is an error
            });
    }, []);  // Empty dependency array means it runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>;  // Show loading message while the quote is being fetched
    }

    return (
        <div>
            <QuoteGenerator quote={quote} />  {/* Pass the fetched quote to QuoteGenerator */}
            <HomePage />
            <AddQuote />
            <QuoteList quote={quote} />  {/* Pass the quote to the QuoteList component */}
        </div>
    );
}

export default App;