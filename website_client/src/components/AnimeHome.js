import React, { useState } from 'react';
import { Grid, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import AnimeSearch from './AnimeSearch';
import AnimeList from './AnimeList';
import AnimeCorrect from './AnimeCorrect';
import Header from './Header';
//import PoolSelector from './PoolSelector';
import PoolService from '../services/pool';
import http from '../http-common';
import axios from "axios";



function AnimeHome(){
    const [query, setQuery] = useState(-1);
    const [animeBank, setAnimeBank] = useState(axios.get("http://74.208.188.50:8082/pool"));
    console.log(animeBank);
    const [truth, setTruth] = useState(axios.get("http://74.208.188.50:8082/pool/daily").then((result)=>(result.data)));
    console.log(truth);
    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    //React.useEffect(() => {
    //  axios.get("http://74.208.188.50:8082/pool").then((result)=> {
    //    setAnimeBank(result.data);
    //    console.log(animeBank)
    //    setTruth(animeBank[Math.floor((Math.random()*animeBank.length))]);
    //  })
    //}, [])
  
    function onSubmit(search) {
        if (!gameOver){
          setQuery(search);
        }
    }

    function onGameReset() {
      setTruth(axios.get("http://74.208.188.50:8082/pool/random").then((result)=>(result.data)));
      setQuery(-1);
      setGuesses([]);
      setGameOver(false);
    }

    return (
        <Container maxWidth='xl'>
            <Header/>
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <AnimeSearch submit={query} bank={animeBank} onSubmit={onSubmit} onGameReset={onGameReset} gameOver={gameOver}/>
              </Grid>
            </Grid>
            <br/>
            <AnimeCorrect gameOver={gameOver} answer={truth}></AnimeCorrect>
            <br/>
            <AnimeList search={query} answer={truth} guesses={guesses} setGameOver={setGameOver}/>
        </Container>
    );
}
export default AnimeHome;
