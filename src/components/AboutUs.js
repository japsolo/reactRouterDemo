import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';

// Components
import Profile from './Profile';

const users = [
	{ id: 1, name: 'Luke Skywalker', img:'http://www.facetheforce.today/luke/400'},
	{ id: 2, name: 'Han Solo', img: 'http://www.facetheforce.today/han/400'},
	{ id: 3, name: 'Leia Morgana', img: 'http://www.facetheforce.today/leia/400'},
];

const AboutUs = ({ location }) => {
	let queryString = new URLSearchParams(location.search);	

	return (
		<React.Fragment>
			<h2>About Us</h2>
			<ListGroup>
				{ users.map((user, i) => <ListGroup.Item key={i}><Link to={`/about/${user.id}`}> {user.name} </Link></ListGroup.Item>) }
			</ListGroup>

			<Switch>
				{/* si un componente recibe props, se usa render en vez de component, y se pasan las props por parámetro para tener scope de .match */}
				<Route path='/about/:id' render={ props => <Profile users={users} {...props} /> } />
			</Switch>
			{
				queryString.get('from') && <p><b>No hay usuario con ID {queryString.get('id')}</b></p>
			}
		</React.Fragment>
	)
}

export default AboutUs;