import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchListPokemon } from '../../actions/pokemon';
import styles from './styles.module.scss'

const ListPokemon = () => {
	const card = useSelector(state => state.listPokemon);
	const dispatch = useDispatch();
	const [hasMore, setHasMore] = useState(true)
	const [start, setStart] = useState(0);
	const [count] = useState(10);
	const [items, setItems] = useState([]);

	useEffect(() => {
		dispatch(fetchListPokemon(start, count));
	}, [dispatch])

	useEffect(() => {
		if (card.listPokemon !== 0 && card.listPokemon.length > 0 ) {
			const { listPokemon } = card;
			setStart(start + count);
			setTimeout(() => {
				setItems(items.concat(listPokemon));
			}, 2500)
		}
	}, [card.listPokemon]);

	const fetchImages = () => {
			if (items.length >= 964) {
				setHasMore(false);
				return;
			}
			setTimeout(() => {
				dispatch(fetchListPokemon(start, count))
			}, 2500)
		};

	const renderListPokemon = () => {
		const { pokemon } = card;
		return (
			<React.Fragment>
			{
				pokemon.length > 0 ?
					<InfiniteScroll
							dataLength={pokemon.length}
							next={fetchImages}
							hasMore={hasMore}
							loader={<img src="/assets/images/spinner.gif" alt="" style={{ width: '20%'}} />}
							height={600}
							style={{
								width: 'auto',
								display: 'flex',
								maxWidth: '80%',
								margin: '2% auto',
								flexWrap: 'wrap',
								alignItems: 'flex-start',
								textAlign: 'center',
							}}
							endMessage={
								<p style={{ textAlign: "center" }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
						>
						{
							pokemon !== undefined && pokemon.length > 0 ?
								pokemon.map((data, index) => {
									return (
										<div className={styles.wrapperCard} key={index + 1}>
										<Link to={`/pokemon/${data.id}`}>
											<div className={cx(data.types[0].type.name, styles.card )}>
												<div className={styles.number}>#{index+1}</div>
												<div>
													<div className={styles.wrapperImg}>
														<img src={data.sprites.front_default} alt="pokemon"/>
													</div>
														<hr />
													<div className={styles.name}>{data.name.toUpperCase()}</div>
													<div>Type: {data.types[0].type.name}</div>
												</div>
											</div>
											</Link>
										</div>
									);
								}) : ''
						}
					</InfiniteScroll> : ''
			}
			</React.Fragment>
		);
	}

	return (
		<div className="wrapper-list-pokemon">
			<div className={styles.navWrapper}>
				<Link to="/">List Pokemon</Link>
				<Link to='/my-pokemon'>My Pokemon</Link>
			</div>
			<div className={styles.container}>
				<div className={styles.row}>
					{renderListPokemon()}
				</div>
			</div>
		</div>
	)

}

export default ListPokemon;
