import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Home from './Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Characters from './Characters';
import NotFound from './NotFound';

const Content = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/about' component={AboutUs} />
			<Route path='/contact' component={Contact} />
			<Route path='/characters' component={Characters} />
			<Route component={NotFound} />
		</Switch>
	)
}

export default Content;