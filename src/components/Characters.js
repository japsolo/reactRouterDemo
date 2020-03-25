import React, { Component } from 'react';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

class Api extends Component {
	constructor (props) {
		super(props);
		this.state = {
			characters: [],
			loading: true,
			nextPage: null,
			loadMore: false,
			showModal: false,
			characterDetails: null,
		}
	}

	fetchCall (endPoint, callback) {
		fetch(endPoint)
			.then(response => response.json())
			.then(data => callback(data))
			.catch(error => console.error(error))
	}

	componentDidMount () {
		this.fetchCall('https://swapi.co/api/people/?page=1&format=json', data => {
			this.setState({
				characters: data.results,
				loading: false,
				nextPage: data.next,
			})
		})
	}

	componentWillUnmount () {
		console.log('Unmounted Characters Component');
	}

	callMoreCharacters = () => {
		this.setState({ loadMore: true });
		let { nextPage, characters } = this.state;

		if (nextPage) {
			this.fetchCall(nextPage, data => {
				this.setState({
					characters: [...characters, ...data.results],
					loadMore: false,
					nextPage: data.next,
				})
			})
		}
	}

	showCharacterDetails = (e) => {
		let { characters } = this.state;
		let idx = e.target.dataset.idx;
		let character = characters[idx];

		character.filmTitles = [];
		character.films.forEach(async uri => {
			let film = await fetch(uri).then(r => r.json());
			character.filmTitles = [...character.filmTitles, {title: film.title, overview: film.opening_crawl}];
			this.setState({ characterDetails: character, showModal: true });
		});
	}
	
	handleHide () {
		this.setState({ showModal: false });
	}

	render () {
		let { loading, characters, loadMore, nextPage, showModal, characterDetails } = this.state;
		
		return (
			<React.Fragment>
			<Row>
				{
					loading ?
					<Col xs={12} className='my-3'>
						<Spinner animation="grow" variant="warning" />
					</Col>
					:
					characters && characters.map((character, idx) => {
						return (
							<Col key={idx} md={4} className='my-3'>
								<Card>
									<Card.Body>
										<Card.Title>{character.name}</Card.Title>
										<Card.Text>
											<b>Gender:</b> {character.gender} <br/>
											<b>Birth Year:</b> {character.birth_year} <br/>
										</Card.Text>
										<Button
											variant="info"
											data-idx={idx}
											onClick={this.showCharacterDetails}
										>Ver detalles</Button>
									</Card.Body>
								</Card>
							</Col>
						)
					})
				}
				{
					loadMore && (
						<Col xs={12} className='my-3'>
							<Spinner animation="border" variant="dark" />
						</Col>
					)
				}
				{
					nextPage && (
						<Col xs={12}>
							<Button 
								variant='dark'
								onClick={() => this.callMoreCharacters()}
							>Cargar más</Button>
						</Col>
					)
				}
			</Row>
			{ 
				characterDetails && (
					<Modal show={showModal} onHide={() => this.handleHide()}>
						<Modal.Header closeButton>
							<Modal.Title>{characterDetails.name}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Height</th>
										<th>Mass</th>
										<th>Hair Color</th>
										<th>Total Films</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{characterDetails.height}</td>
										<td>{characterDetails.mass}</td>
										<td>{characterDetails.hair_color}</td>
										<td>{characterDetails.filmTitles.length}</td>
									</tr>
								</tbody>
							</Table>
							<Row>
								{
									characterDetails.filmTitles.map((film, i) => {
										return (
											<Col key={i} lg={6}> 
												<h2>{film.title}</h2>
												<p>{film.overview}</p>
											</Col>
										)
									})
								}
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => this.handleHide()}>Close</Button>
						</Modal.Footer>
					</Modal>
				)
			}
			</React.Fragment>
		)
	}
}

export default Api;