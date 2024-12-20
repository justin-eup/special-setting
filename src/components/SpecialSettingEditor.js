import React, { useEffect, useState } from 'react';
import { Card, Modal, Input, Row, Col } from 'antd';
import MasterServletApiCollection from '../services/Apis';

const { Meta } = Card;

const SpecialSettingEditor = ({ backendUrl, token }) => {
	const [settings, setSettings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedSetting, setSelectedSetting] = useState(null); // Setting selected for modal
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		if (backendUrl && token) {
			setLoading(true);
			MasterServletApiCollection.getAll(backendUrl, token)
				.then((response) => setSettings(response.data.result || []))
				.catch((error) => console.error('Error fetching special settings:', error))
				.finally(() => setLoading(false));
		}
	}, [backendUrl, token]);

	const handleInputChange = (key, value) => {
		setSelectedSetting({ ...selectedSetting, [key]: value });
	};

	const handleSave = () => {
		MasterServletApiCollection.update(backendUrl, token, selectedSetting)
			.then(() => {
				alert('Update successful!');
				setSettings((prev) =>
					prev.map((setting) =>
						setting.specialKey === selectedSetting.specialKey ? selectedSetting : setting
					)
				);
				setIsModalVisible(false);
			})
			.catch((error) => alert('Error updating setting!'));
	};

	const openModal = (setting) => {
		setSelectedSetting(setting);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setSelectedSetting(null);
	};

	return (
		<div>
			<h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Special Settings</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<Row gutter={[16, 16]} justify="center">
					{settings.map((setting, index) => (
						<Col
							key={index}
							xs={24}
							sm={12}
							md={8}
							lg={6}
							xl={4}
							style={{ display: 'flex', justifyContent: 'center' }}
						>
							<Card
								hoverable
								title={setting.specialKey}
								onClick={() => openModal(setting)}
								style={{
									width: '100%',
									borderRadius: '8px',
									textAlign: 'center',
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
								}}
							>
								<Meta description="Click to edit" />
							</Card>
						</Col>
					))}
				</Row>
			)}

			{/* Modal for full context */}
			<Modal
				open={isModalVisible}
				onCancel={() => {
					closeModal();
				}}
				onOk={() => {
					handleSave();
					closeModal();
				}}
				title={`Edit Special Setting: ${selectedSetting?.specialKey}`}
			>
				{selectedSetting &&
					Object.keys(selectedSetting).map((key) => (
						<div key={key} style={{ marginBottom: '8px' }}>
							<label style={{ marginRight: '8px', fontWeight: 'bold' }}>{key}:</label>
							<Input
								value={selectedSetting[key] || ''}
								onChange={(e) => handleInputChange(key, e.target.value)}
							/>
						</div>
					))}
			</Modal>

		</div>
	);
};

export default SpecialSettingEditor;
