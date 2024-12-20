import React, { useState } from 'react';
import './App.css';
import Settings from './components/Settings';
import SpecialSettingEditor from './components/SpecialSettingEditor';

const App = () => {
	const [backendUrl, setBackendUrl] = useState('');
	const [token, setToken] = useState('');

	return (
		<div>
			<Settings setBackendUrl={setBackendUrl} setToken={setToken} />
			{backendUrl && token ? (
				<SpecialSettingEditor backendUrl={backendUrl} token={token} />
			) : (
				<p style={{ textAlign: 'center', marginBottom: '16px' }}>Please configure API settings above.</p>
			)}
		</div>
	);
}

export default App;
