import React, { useState } from 'react';
import { add } from '../string-calculator';

function StringCalcPage() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleButtonClick = () => {
        try {
            console.log(input);
            const sum = add(input);
            console.log(sum)
            setResult(sum);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Add Numbers</h2>
            <input 
                type="text" 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Enter numbers (e.g., 1,2 or //;\n1;2)" 
                style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
            <button onClick={handleButtonClick} style={{ padding: '10px 20px' }}>
                Calculate
            </button>
            {result !== null && <div style={{ marginTop: '20px' }}><strong>Result:</strong> {result}</div>}
            {error && <div style={{ marginTop: '20px', color: 'red' }}><strong>Error:</strong> {error}</div>}
        </div>
    );
}

export default StringCalcPage;
