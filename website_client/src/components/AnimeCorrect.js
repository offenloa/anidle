import React, { useState, useEffect } from 'react';
import { Grid, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

import {useQuery, gql} from '@apollo/client'
import animebank from '../animebank.json'

function AnimeCorrect({gameOver, answer}){
    const [answerStats, setAnswerStats] = useState({});

    useEffect(() => {
        const getAnswer = async () => {

            let answerResult = await answer;

            setAnswerStats(answerResult);
        }
        getAnswer();
    }, []);
        

    return (
        <>
        {
            gameOver ?
            <Paper sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
                <div>
                    <Typography variant='h4'>The anime was {answerStats.title.english != null ? answerStats.title.english : answerStats.title.romaji}</Typography>
                    <Grid paddingTop={2} container columns={{xs: 2}} justifyContent="flex-start">
                        <Grid item xs={1} alignContent="center">
                        <a href={answerStats.siteUrl}><img src={answerStats.coverImage.large}/></a>
                        </Grid>
                        
                        <Grid item xs={1} >
                        {answerStats.description.replaceAll("<br>", "\n").replaceAll("</br>", "")}
                        </Grid>
                    </Grid>
                </div>
            </Paper>
            :
            <>{gameOver}</>
        }
        </>
    );
}
export default AnimeCorrect;