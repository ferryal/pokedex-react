import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchListPokemon, resetDetailPokemon } from '../../actions/pokemon';
import styles from './styles.module.scss';

const ListPokemon = () => {
  const card = useSelector((state) => state.listPokemon);
  const dispatch = useDispatch();
  const { pokemon } = card;
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(0);
  const [count] = useState(15);
  const [items, setItems] = useState([]);
  const [resultFilter, setresultFilter] = useState([]);
  const [filters, setfilter] = useState(
    [
      { id: 1, value: 'normal', isChecked: false },
      { id: 2, value: 'bug', isChecked: false },
      { id: 3, value: 'poison', isChecked: false },
      { id: 4, value: 'grass', isChecked: false },
      { id: 5, value: 'flying', isChecked: false },
      { id: 6, value: 'water', isChecked: false },
      { id: 7, value: 'fire', isChecked: false },
      { id: 8, value: 'electric', isChecked: false },
      { id: 9, value: 'ground', isChecked: false },
      { id: 10, value: 'rock', isChecked: false },
      { id: 11, value: 'ghost', isChecked: false },
      { id: 12, value: 'steel', isChecked: false },
      { id: 13, value: 'shadow', isChecked: false },
      { id: 14, value: 'ice', isChecked: false },
      { id: 15, value: 'dark', isChecked: false },
      { id: 16, value: 'dragon', isChecked: false },
      { id: 17, value: 'fairy', isChecked: false },
      { id: 18, value: 'psychic', isChecked: false },
      { id: 19, value: 'unknown', isChecked: false },
    ],
  );

  useEffect(() => {
    dispatch(fetchListPokemon(start, count));
    dispatch(resetDetailPokemon());
  }, [dispatch]);

  useEffect(() => {
    if (card.listPokemon !== 0 && card.listPokemon.length > 0) {
      const { listPokemon } = card;
      setStart(start + count);
      setTimeout(() => {
        setItems(items.concat(listPokemon));
      }, 2500);
    }
  }, [card.listPokemon]);

  const fetchImages = () => {
    if (items.length >= 964) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      dispatch(fetchListPokemon(start, count));
    }, 2500);
  };

  const handleChangeFilter = (id) => {
    const newFilters = filters.map((filter) => ({
      ...filter,
      isChecked: filter.id === id ? !filter.isChecked : filter.isChecked,
    }));
    setfilter(newFilters);
    const filterPayload = newFilters
      .filter((filter) => filter.isChecked)
      .map((filter) => filter.value);
    findResultFilter(filterPayload);
  };

  const findResultFilter = (filterPayload) => {
    const result = [];
    for (let i = 0; i < pokemon.length; i += 1) {
      const element = pokemon[i];
      element.types.filter((el) => (
        filterPayload.filter((name) => {
          if (filterPayload.length !== 0 && el.type.name.match(name)) {
            return result.push(element);
          }
          return false;
        })
      ));
    }
    if (result.length === 0) {
      toast.warn('No data on filter');
    }
    setresultFilter(result);
  };

  const renderedFilter = filters.map((filter) => (
    <div
      className={styles.buttonChildrenFilter}
      style={{
        backgroundColor: filter.isChecked ? '#bd9354' : '#3333',
        borderColor: filter.isChecked ? '#bd9354' : '#e3d18a',
        color: filter.isChecked ? 'white' : 'white',
      }}
      onClick={() => handleChangeFilter(filter.id)}
      key={filter.id}
    >
      <span className={styles.textChildrenFilter}>{filter.value}</span>
    </div>
  ));

  const renderListPokemon = () => (
    <>
      {
        pokemon.length > 0 && resultFilter.length === 0
          ? (
            <InfiniteScroll
              dataLength={pokemon.length}
              next={fetchImages}
              hasMore={hasMore}
              loader={<img src="/assets/images/spinner.gif" alt="" style={{ width: '20%' }} />}
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
              endMessage={(
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )}
            >
              {
                pokemon !== undefined && pokemon.length > 0
                  ? pokemon.map((data, index) => (
                    <div className={styles.wrapperCard} key={index + 1}>
                      <Link to={`/pokemon/${data.id}`}>
                        <div className={cx(data.types[0].type.name, styles.card)}>
                          <div className={styles.number}>
                            #
                            {index + 1}
                          </div>
                          <div>
                            <div className={styles.wrapperImg}>
                              <img src={data.sprites.front_default} alt="pokemon" />
                            </div>
                            <hr />
                            <div className={styles.name}>{data.name.toUpperCase()}</div>
                            <div className={styles.flex}>
                              {data.types.map((poke) => <div key={poke.slot} className={styles.badge}>{poke.type.name}</div>)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )) : ''
              }
            </InfiniteScroll>
          ) : resultFilter.map((data, index) => (
            <div className={styles.wrapperCard} key={index + 1}>
              <Link to={`/pokemon/${data.id}`}>
                <div className={cx(data.types[0].type.name, styles.card)}>
                  <div className={styles.number}>
                    #
                    {index + 1}
                  </div>
                  <div>
                    <div className={styles.wrapperImg}>
                      <img src={data.sprites.front_default} alt="pokemon" />
                    </div>
                    <hr />
                    <div className={styles.name}>{data.name.toUpperCase()}</div>
                    <div className={styles.flex}>
                      {data.types.map((poke) => <div key={poke.slot} className={styles.badge}>{poke.type.name}</div>)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
      }
    </>
  );

  return (
    <div className="wrapper-list-pokemon">
      <div className={styles.navWrapper}>
        <Link to="/">List Pokemon</Link>
        <Link to="/my-pokemon">Compare Pokemon</Link>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapperFilter}>
          {renderedFilter}
        </div>
        <div className={styles.row}>
          {renderListPokemon()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListPokemon;
