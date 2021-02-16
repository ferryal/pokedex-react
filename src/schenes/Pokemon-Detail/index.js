import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap'
import { ToastContainer, toast} from 'react-toastify';
import { fetchPokemonDetail, addPokemon } from '../../actions/pokemon';
import styles from './styles.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const PokemonDetail = (props) => {
	const [openMoves, setopenMoves] = useState(false);
	const [openTypes, setopenTypes] = useState(false);
	const dispatch = useDispatch();
	const card = useSelector(state => state.detailPokemon);

	useEffect(() => {
		dispatch(fetchPokemonDetail(props.match.params.id));
	}, [dispatch]);

	const handleSeeMoves = () => {
		setopenMoves(!openMoves);
		setopenTypes(false);
	}

	const handleSeeTypes = () => {
		setopenTypes(!openTypes);
		setopenMoves(false);
	}

	const handleAddPokemon = () => {
		const { detail } = card;
		const { sprites, moves, types } = detail;
		let front_default = '';
			if (sprites && sprites.front_default !== '') {
				({ front_default } = sprites);
			} else if (sprites && sprites.front_default !== '') {
				front_default = sprites.front_default;
			}
		let tempPokemonList = {
			types: types,
			moves: moves,
			image: front_default
		};
		dispatch(addPokemon(detail));
		if (tempPokemonList.name !== '') {
			toast.success("Wow, you success catch the pokemon!!");
		} else {
			toast.warn("Please input pokemon name");
		}
	}

	const { detail } = card;
	const { sprites, moves, types, stats, abilities } = detail;
	let front_default = '';
	if (sprites && sprites.front_default !== '') {
			({ front_default } = sprites);
	} else if (sprites && sprites.front_default !== '') {
		front_default = sprites.front_default;
	}
	const pokemonName = card && detail ? detail.name : '';

	return(
		<React.Fragment>
			<div className={styles.navWrapper}>
				<Link to="/">List Pokemon</Link>
				<Link to='/my-pokemon'>Compare Pokemon</Link>
			</div>
			<div className={styles.container}>	
				<div className={styles.wrapperCard}>
					<div className={styles.card}>
						<div>
							<img className={styles.img} src={front_default} alt="pokemon"/>
						</div>
						<div className="">
							<div className={styles.name}>{ pokemonName.toUpperCase() }</div>
							<div className="">
								<div className="">
									<span className="btn btn-outline-danger nav-link badge" onClick={handleSeeMoves}>See Moves</span>
									<span className="btn btn-outline-danger nav-link badge" onClick={handleSeeTypes}>See Types</span>
								</div>
							</div>
							<Collapse in={openMoves}>
								<div className="">
									{moves ?
										moves.map((data, index) => {
										return (
											<span id="moves" className="badge badge-pill badge-info" key={index+1}>{data.move.name}</span>
										);
									}) : ''
									}
								</div>
							</Collapse>
							<Collapse in={openTypes}>
								<div className="text-center">
								{types ?
									types.map((data, index) => {
									return (
										<span id="moves" className="badge badge-pill badge-info" key={index+1}>{data.type.name}</span>
									);
								}) : ''
								}
								</div>
							</Collapse>
						</div>
						<div className={styles.wrapperInfo}>
							<div className={styles.info}>
								{stats ?
									stats.map((data, index) => {
										return (
											<p key={index+1}>{data.stat.name.toUpperCase()}: {data.base_stat}</p>
										)
									}) : ''
								}
							</div>
							<div className={styles.info}>
								<p>BASE EXP: {detail.base_experience}</p>
								<p>WEIGHT: {detail.weight}</p>
								<p>HEIGHT: {detail.height}</p>
								{abilities ?
									abilities.map((data, index) => {
										return (
											<p key={index+1}>ABILITY: {data.ability.name.toUpperCase()}</p>
										)
									}) : ''
								}
							</div>
						</div>
						<button className="btn btn-primary" onClick={handleAddPokemon}>Compare pokemon</button>
					</div>
				</div>
			</div>
			<ToastContainer />
		</React.Fragment>
	)

}

export default PokemonDetail;
