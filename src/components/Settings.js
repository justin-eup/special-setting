import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import MasterServletApiCollection from '../services/Apis';

const Settings = ({ setBackendUrl, setToken }) => {
    const [url, setUrl] = useState('');
    const [tokenInput, setTokenInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null); // null = no check, true = valid, false = invalid

    const handleSave = async () => {
        const isValid = await MasterServletApiCollection.verifyUrl(url, tokenInput);
        setVerificationResult(isValid);

        if (!isValid) {
            console.error('Invalid URL or token');
			setBackendUrl('');
        	setToken('');
            return;
        }
        setBackendUrl(url);
        setToken(tokenInput);
    };

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>API Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <input
                    type="text"
                    placeholder="Enter MasterServlet URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter Token"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }}
                    >
                        Apply
                    </button>
                    {verificationResult !== null && (
                        verificationResult ? (
                            <FaCheckCircle style={{ color: 'green', fontSize: '20px' }} />
                        ) : (
                            <FaTimesCircle style={{ color: 'red', fontSize: '20px' }} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
