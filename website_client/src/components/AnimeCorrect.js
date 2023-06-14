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
    }, [answer]);
        

    return (
        <>
        {
            gameOver ?
            <>
            <Paper variant="outlined" square sx={{"px": "16px", "py": "8px"}}>
                <div>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                    <Typography variant='h4'>The anime was {answerStats.title.english != null ? answerStats.title.english : answerStats.title.romaji} !</Typography>
                </Box>
                <br/>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                    
                    <p style={{flex: 1}}><a style={{float: "right", paddingLeft: 8}} href={answerStats.siteUrl}><img style={{border: "2px solid"}} src={answerStats.coverImage.large}/></a>{answerStats.description.replaceAll("<br>", "\n").replaceAll("</br>", "")}</p>
                </Box>
                </div>
            </Paper>
            <br/>
            </>
            :
            <>{gameOver}</>
        }
        </>
    );
}
export default AnimeCorrect;