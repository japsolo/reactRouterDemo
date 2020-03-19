import React from 'react';
import { Redirect } from 'react-router-dom';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Profile = (props) => {
	// Query String
	// let queryString  = new URLSearchParams(props.history.location.search);	
	
	let { users } = props;
	let { history } = props;
	let { id } = props.match.params;
	let user = users.find(user => user.id === Number(id));

	if (user) {
		return (
			<Row className="justify-content-center my-5">
				<Col xs={8}>
					<Card>
						<Card.Img variant="top" src={user.img} />
						<Card.Body>
							<Card.Title>{user.name}</Card.Title>
							<Card.Text>
								<i>Hello,</i> I'm {user.name} 
    						</Card.Text>
							<Button 
								variant="primary"
								onClick={() => history.goBack()}
							>Regresar</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		)
	}
	return <Redirect to={`/about?from=profile&id=${id}`} />
}

export default Profile;