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

            console.log(answerResult);

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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                    <Typography variant='h4'>The anime was {answerStats.title.english != null ? answerStats.title.english : answerStats.title.romaji} !</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                    <a href={answerStats.siteUrl}><img src={answerStats.coverImage.large}/></a>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                    {answerStats.description.replaceAll("<br>", "\n").replaceAll("</br>", "")}
                </Box>
                </div>
            </Paper>
            :
            <>{gameOver}</>
        }
        </>
    );
}
export default AnimeCorrect;