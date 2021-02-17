import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

const MyPokemon = () => {
  const myPokemon = useSelector((state) => state.myPokemon);
  return (
    <>
      <div className={styles.navWrapper}>
        <Link to="/">List Pokemon</Link>
        <a href="#">Prediction Win Rate</a>
      </div>
      <div id="container" className={styles.container}>
        <table className={styles.dextable} align="center">
          <tbody>
            <tr>
              <td align="center" className={styles.fooevo} rowSpan="2" width="25%">Pic</td>
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
            {myPokemon.myPokemon.length > 0
              ? myPokemon.myPokemon.map((data, index) => (
                <tr key={index + 1}>
                  <td align="center" className="fooinfo">
                    <table className="pkmn"><tbody><tr><td><img src={data.image} border="0" alt="" /></td></tr></tbody></table>
                  </td>
                  <td align="center" className="fooinfo">{data.detail.name.toUpperCase()}</td>
                  <td align="center" className="fooinfo">{data.detail.types.map((types, idx) => <p key={idx + 1}>{types.type.name}</p>)}</td>
                  <td align="center" className="fooinfo">{data.detail.base_experience}</td>
                  <td align="center" className="fooinfo">
                    {data.detail.height}
                    m
                  </td>
                  <td align="center" className="fooinfo">
                    {data.detail.weight}
                    kg
                  </td>
                  <td align="center" className="fooinfo">{data.detail.abilities.map((abilities, idx) => <p key={idx + 1}>{abilities.ability.name}</p>)}</td>
                  { data.detail.stats.map((base, idx) => <td key={idx + 1} align="center" className="fooinfo">{base.base_stat}</td>) }
                  <td className="cen">{data.detail.stats.reduce((accumulator, currentValue) => accumulator + currentValue.base_stat, 0)}</td>
                </tr>
              )) : '' }
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyPokemon;
