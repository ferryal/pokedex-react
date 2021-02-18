import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import cx from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { fetchPokemonDetail, addPokemon } from '../../actions/pokemon';
import styles from './styles.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const PokemonDetail = (props) => {
  const [openMoves, setopenMoves] = useState(false);
  const [openTypes, setopenTypes] = useState(false);
  const dispatch = useDispatch();
  const card = useSelector((state) => state.detailPokemon);

  useEffect(() => {
    dispatch(fetchPokemonDetail(props.match.params.id));
  }, [dispatch]);

  const handleSeeMoves = () => {
    setopenMoves(!openMoves);
    setopenTypes(false);
  };

  const handleSeeTypes = () => {
    setopenTypes(!openTypes);
    setopenMoves(false);
  };

  const handleAddPokemon = () => {
    const { detail } = card;
    const { sprites } = detail;
    let front_default = '';
    if (sprites && sprites.front_default !== '') {
      ({ front_default } = sprites);
    } else if (sprites && sprites.front_default !== '') {
      front_default = sprites.front_default;
    }
    const payload = {
      detail,
      image: front_default,
    };
    dispatch(addPokemon(payload));
    toast.success('Success to compare pokemon');
  };

  const { detail } = card;
  const {
    sprites, moves, types, stats, abilities,
  } = detail;
  let front_default = '';
  if (sprites && sprites.front_default !== '') {
    ({ front_default } = sprites);
  } else if (sprites && sprites.front_default !== '') {
    front_default = sprites.front_default;
  }
  const pokemonName = card && detail ? detail.name : '';

  return (
    <>
      <div className={styles.navWrapper}>
        <Link to="/">List Pokemon</Link>
        <Link to="/my-pokemon">Compare Pokemon</Link>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapperCard}>
          <div className={styles.card}>
            {
              card.detail.name !== ''
                ? (
                  <>
                    <div>
                      <img className={styles.img} src={front_default} alt="pokemon" />
                    </div>
                    <div>
                      <div className={styles.name}>{ pokemonName.toUpperCase() }</div>
                      <div className={styles.collapse}>
                        <span className={styles.badge} onClick={handleSeeMoves}>See Moves</span>
                        <span className={styles.badge} onClick={handleSeeTypes}>See Types</span>
                      </div>
                      <Collapse in={openMoves}>
                        <div className={styles.collapse}>
                          {moves
                            ? moves.map((data, index) => (
                              <span id="moves" className={styles.badgeInfo} key={index + 1}>{data.move.name}</span>
                            )) : ''}
                        </div>
                      </Collapse>
                      <Collapse in={openTypes}>
                        <div className={styles.collapse}>
                          {types
                            ? types.map((data, index) => (
                              <span id="moves" className={styles.badgeInfo} key={index + 1}>{data.type.name}</span>
                            )) : ''}
                        </div>
                      </Collapse>
                    </div>
                    <div className={styles.wrapperInfo}>
                      <div className={styles.info}>
                        {stats
                          ? stats.map((data, index) => (
                            <p key={index + 1}>
                              {data.stat.name.toUpperCase()}
                              :
                              {' '}
                              {data.base_stat}
                            </p>
                          )) : ''}
                      </div>
                      <div className={styles.info}>
                        <p>
                          BASE EXP:
                          {detail.base_experience}
                        </p>
                        <p>
                          WEIGHT:
                          {detail.weight}
                        </p>
                        <p>
                          HEIGHT:
                          {detail.height}
                        </p>
                        {abilities
                          ? abilities.map((data, index) => (
                            <p key={index + 1}>
                              ABILITY:
                              {data.ability.name.toUpperCase()}
                            </p>
                          )) : ''}
                      </div>
                    </div>
                    <button className={cx(styles.size, 'btn', 'btn-primary')} onClick={handleAddPokemon}>Compare pokemon</button>
                  </>
                ) : <img src="/assets/images/spinner.gif" alt="" style={{ width: '20%' }} />
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PokemonDetail;
