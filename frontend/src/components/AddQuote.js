// frontend/components/AddQuote.js
import React, { useState } from 'react';
import axios from 'axios';

function AddQuote() {
    const [quote, setQuote] = useState({ text: '', author: '' });

    const handleChange = (e) => {
        setQuote({ ...quote, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/quotes', quote);
            console.log('Quote added:', res.data);
            setQuote({ text: '', author: '' }); // Reset form after successful submission
        } catch (error) {
            console.error('Error adding quote:', error);
        }
    };

    return (
        <div>
            <h2>Add a Quote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="text"
                        value={quote.text}
                        onChange={handleChange}
                        placeholder="Enter quote text"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="author"
                        value={quote.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                    />
                </div>
                <button type="submit">Add Quote</button>
            </form>
        </div>
    );
}

export default AddQuote;