import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import Modal from './components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

const MyPokemon = () => {
  const pokemon = useSelector((state) => state.myPokemon);
  const [winner, setwinner] = useState([]);
  const [result, setresult] = useState({});
  const [show, setShow] = useState(false);
  const { myPokemon } = pokemon;

  useEffect(() => {
    setWinnerPrediction();
  }, [myPokemon.length > 1]);

  const isEmptyObj = (obj) => JSON.stringify(obj) === '{}';

  const setWinnerPrediction = () => {
    const array = [];
    for (let i = 0; i < myPokemon.length; i += 1) {
      const element = myPokemon[i];
      const totalBase = element.detail.stats.reduce((accumulator, currentValue) => accumulator + currentValue.base_stat, 0);
      const obj = {
        image: element.image,
        name: element.detail.name,
        totalBase,
      };
      array.push(obj);
    }
    setwinner(array);
  };

  const getWinnerPrediction = () => {
    if (winner.length > 1) {
      const checkWinner = Math.max(...winner.map((o) => o.totalBase));
      const found = winner.find((post) => {
        if (post.totalBase === checkWinner) {
          return true;
        }
        return false;
      });
      setresult(found);
      setShow(true);
    } else {
      toast.warn('at least 2 pokemon to see win prediction');
    }
  };

  return (
    <>
      <div className={styles.navWrapper}>
        <Link to="/">List Pokemon</Link>
        <button onClick={getWinnerPrediction} className={styles.btn}>See winner pokemon</button>
      </div>
      <div id="container" className={styles.container}>
        {
          myPokemon.length > 1
            ? (
              <table className={styles.dextable} align="center">
                <tbody>
                  <tr>
                    <td align="center" className={styles.fooevo} rowSpan="2" width="25%">Image</td>
                    <td align="center" className={styles.fooevo} rowSpan="2">Name</td>
                    <td align="center" className={styles.fooevo} rowSpan="2">Type</td>
                    <td align="center" className={styles.fooevo} rowSpan="2">Base EXP</td>
                    <td align="center" className={styles.fooevo} rowSpan="2">Height</td>
                    <td align="center" className={styles.fooevo} rowSpan="2">Weight</td>
                    <td align="center" className={styles.fooevo} rowSpan="2" width="10%">Abilities</td>
                    <td align="center" className={styles.fooevo} colSpan="6" width="10%">Base Stat</td>
                    <td align="center" className={styles.fooevo} rowSpan="2" width="10%">Total Base Stat</td>
                  </tr>
                  <tr>
                    <td align="center" className={styles.fooevo}>HP</td>
                    <td align="center" className={styles.fooevo}>Att</td>
                    <td align="center" className={styles.fooevo}>Def</td>
                    <td align="center" className={styles.fooevo}>S.Att</td>
                    <td align="center" className={styles.fooevo}>S.Def</td>
                    <td align="center" className={styles.fooevo}>Spd</td>
                  </tr>
                  {pokemon.myPokemon.length > 0
                    ? pokemon.myPokemon.map((data, index) => (
                      <tr key={index + 1}>
                        <td align="center" className={styles.fooInfo}>
                          <table className="pkmn"><tbody><tr><td><img src={data.image} border="0" alt="" /></td></tr></tbody></table>
                        </td>
                        <td align="center" className={styles.fooInfo}>{data.detail.name.toUpperCase()}</td>
                        <td align="center" className={styles.fooInfo}>{data.detail.types.map((types, idx) => <p key={idx + 1} className={styles.badge}>{types.type.name}</p>)}</td>
                        <td align="center" className={styles.fooInfo}>{data.detail.base_experience}</td>
                        <td align="center" className={styles.fooInfo}>
                          {data.detail.height}
                          m
                        </td>
                        <td align="center" className={styles.fooInfo}>
                          {data.detail.weight}
                          kg
                        </td>
                        <td align="center" className={styles.fooInfo}>{data.detail.abilities.map((abilities, idx) => <p key={idx + 1}>{abilities.ability.name}</p>)}</td>
                        { data.detail.stats.map((base, idx) => <td key={idx + 1} align="center" className={styles.fooInfo}>{base.base_stat}</td>) }
                        <td className={cx(styles.fooInfo, styles.center)}>{data.detail.stats.reduce((accumulator, currentValue) => accumulator + currentValue.base_stat, 0)}</td>
                      </tr>
                    )) : '' }
                </tbody>
              </table>
            ) : <p className={styles.notif}>at least 2 pokemon to see win prediction</p>
        }
        <Modal show={show} setShow={setShow} className={styles.scaleDownCenter}>
          <h2>Winner Prediction Pokemon</h2>
          {
            !isEmptyObj(result)
              ? (
                <>
                  <img className={styles.imgWinner} src={result.image} alt="" />
                  <p className={styles.nameWinner}>{result.name.toUpperCase()}</p>
                  <p className={styles.totalBase}>
                    Score in total base stat:
                    {result.totalBase}
                  </p>
                </>
              )
              : ''
          }
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyPokemon;
