import React from 'react';

// Bootstrap components
import Container from 'react-bootstrap/Container';

// Components
import NavBar from './components/Navbar';
import Content from './components/Content';

function App () {
	return ( 
		<React.Fragment>
			<NavBar/>
			<Container className="my-5">
				<Content/>
			</Container>
		</React.Fragment>
	);
}

export default App;