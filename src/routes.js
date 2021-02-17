import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListPokemon from './schenes/List-Pokemon';
import PokemonDetail from './schenes/Pokemon-Detail';
import MyPokemon from './schenes/My-Pokemon';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={ListPokemon} />
      <Route path="/pokemon/:id" component={PokemonDetail} />
      <Route path="/my-pokemon" component={MyPokemon} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default Routes;
