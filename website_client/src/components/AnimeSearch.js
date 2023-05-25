import React, { useState, useEffect } from 'react';
import { Grid, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';

import {useQuery, gql} from '@apollo/client'
import animebank from '../animebank.json'
import { blueGrey } from '@mui/material/colors';

function AnimeSearch({onSubmit, onGameReset, gameOver, bank}){
    const [term, setTerm] = useState("");
    const [guessID, setGuessID] = useState("");
    function onClick() {
        onSubmit(guessID.id);
    }
    
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getBank = async () => {

            let answerResult = bank.then((result) => (result.data.map((ani) => ({label: ani.title.romaji+(ani.title.english!=null?" ("+ani.title.english+")":""), id: ani.id}))));

            let pool = await answerResult;

            setOptions(pool);
        }
        getBank();
    }, []);

    return (
            <Paper sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
                <Box marginTop={2}>
                    <Autocomplete options={options} value={guessID} onChange={(event, newValue) => {
          setGuessID(newValue);
        }} renderInput={(params) => <TextField {...params} label="Anime"/>} onSubmit={(newValue)=> (setGuessID(newValue))} isOptionEqualToValue={(option, value) => option.id === value.id}/>
                    <Grid paddingTop={1} container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid item>
                        <Button variant='contained' disabled={gameOver?true:false} onClick={onClick}>Guess</Button>
                        </Grid>
                        <Grid item>
                        <Button variant='contained' onClick={onGameReset}>Reset</Button>
                        </Grid>
                    </Grid>
                </Box>

            </Paper>
    );
}
export default AnimeSearch;