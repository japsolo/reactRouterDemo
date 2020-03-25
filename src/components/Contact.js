import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Axios
import Axios from '../axios';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Contact = () => {
	const AxiosCall = new Axios();

	const [data, setData] = useState({});
	const [allowed, setAllowed] = useState();
	const [id, setId] = useState();	
	
	const handleSubmit = e => {
		e.preventDefault();

	AxiosCall.sendData(data)
		.then(response => {
			let finalData = response.data;
			setId(finalData.id);
			if (finalData.msg === 'not allowed') {
				setAllowed(false);
			} else {
				setAllowed(true);
			}
		})
		.catch(error => console.error(error));

		// fetch('http://localhost:3001', {
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// 	headers: {'Content-Type': 'application/json'}
		// })
		// .then(res => res.json())
		// .then(data => {
		// 	console.log(data);
		// 	setId(data.id);
		// 	if (data.msg === 'not allowed') {
		// 		setAllowed(false);
		// 	} else {
		// 		setAllowed(true);
		// 	}
		// })
		// .catch(error => console.error(error));
	}

	const handleChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
		console.log(data);
	}
	
	return (
		<React.Fragment>
			{ allowed ? <Redirect to={`/about/${id}`} /> : null }
			<h2>Contact: {data.email}</h2>
			<Form 
				method="POST"
				onSubmit={handleSubmit}
			>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" name="email" 
						className={typeof allowed != 'undefined' ? allowed ? 'is-valid' : 'is-invalid' : null} 
						onChange={handleChange}
					/>
					<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name="password" 
						onChange={handleChange}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
  				</Button>
			</Form>
		</React.Fragment>
	)
}

export default Contact;