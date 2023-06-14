import React, { useState } from 'react';
import { Grid, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import AnimeSearch from './AnimeSearch';
import AnimeList from './AnimeList';
import AnimeCorrect from './AnimeCorrect';
import Header from './Header';
import PoolSelector from './PoolSelector';
import PoolService from '../services/pool';
import http from '../http-common';
import axios from "axios";
import config from "../config.json"
import AnimeMystery from './AnimeMystery';
import Instructions from './Instructions';
import Footer from './Footer';



function AnimeHome({unlimited}){
    const [query, setQuery] = useState(-1);
    const [animeBank, setAnimeBank] = useState(axios.get("http://"+config.api_addr+":"+config.api_port+"/pool"));
    const [truth, setTruth] = useState(unlimited?animeBank.then((result)=>{
      let res = result.data[Math.floor(Math.random()*result.data.length)];
      return res;
    }):axios.get("http://"+config.api_addr+":"+config.api_port+"/pool/daily").then((result)=>(result.data)));
    const [guesses, setGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [revealTags, setRevealTags] = useState(false);

    function addGuess(guess) {
      guesses.unshift(guess);
      setToggle(!toggle);
    }

    //React.useEffect(() => {
    //  axios.get("http://74.208.188.50:8082/pool").then((result)=> {
    //    setAnimeBank(result.data);
    //    console.log(animeBank)
    //    setTruth(animeBank[Math.floor((Math.random()*animeBank.length))]);
    //  })
    //}, [])

    function setPoolTop() {
      setAnimeBank(axios.get("http://"+config.api_addr+":"+config.api_port+"/pool"))
      setTruth(animeBank.then((result)=>{
        let res = result.data[Math.floor(Math.random()*result.data.length)];
        return res;
      }));
      setRevealTags(false);
      setQuery(-1);
      setGuesses([]);
      setGameOver(false);
      setToggle(!toggle);
    }

    function setPoolAcc(account) {
      setAnimeBank(axios.get("http://"+config.api_addr+":"+config.api_port+"/pool/user/"+account))
      setTruth(axios.get("http://"+config.api_addr+":"+config.api_port+"/pool/user/"+account).then((result)=>{
        let res = result.data[Math.floor(Math.random()*result.data.length)];
        return res;
      }));
      setRevealTags(false);
      setQuery(-1);
      setGuesses([]);
      setGameOver(false);
      setToggle(!toggle)
    }
  
    function onSubmit(search) {
        if (!gameOver){
          setQuery(search);
        }
    }

    function onGameReset() {
      setTruth(animeBank.then((result)=>{
        let res = result.data[Math.floor(Math.random()*result.data.length)];
        return res;
      }));
      setRevealTags(false);
      setQuery(-1);
      setGuesses([]);
      setGameOver(false);
      setToggle(!toggle);
    }

    return (
      <div className="bg-slate-900" style={{"minHeight": "100vh", "display": "flex", "flexDirection": "column"}}>
        <Header unlimited={unlimited}/>
        <Container maxWidth='xl' style={{"flex": 1}}>
            <br/>
            {unlimited?
              <div style={{display: "flex", alignItems: "stretch", gap: "8px"}} spacing={2}>
                <div style={{flex:2}}>
                <Instructions/>
                </div>
                <div style={{flex:1}}>
                <PoolSelector setPoolAcc={setPoolAcc} setPoolTop={setPoolTop}/>
                </div>
              </div>
              :
              <Instructions/>
            }
            <br/>
            <AnimeCorrect gameOver={gameOver} answer={truth}></AnimeCorrect>
            <AnimeMystery toggle={toggle} answerPromise={truth} guesses={guesses} revealTags={revealTags} setRevealTags={setRevealTags}></AnimeMystery>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <AnimeSearch toggle={toggle} submit={query} bank={animeBank} onSubmit={onSubmit} onGameReset={onGameReset} gameOver={gameOver} unlimited={unlimited}/>
              </Grid>
            </Grid>
            <br/>
            <AnimeList search={query} answer={truth} guesses={guesses} setGuesses={addGuess} setGameOver={setGameOver}/>
        
        </Container>
        <br/>
        <Footer/>
      </div>
    );
}
export default AnimeHome;
