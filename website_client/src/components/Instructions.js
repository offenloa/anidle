import React, { useState, useEffect } from 'react';
import { Grid, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

import {useQuery, gql} from '@apollo/client'

function Instructions(){
    const [show, setShow] = useState(true);
        
    return (
      <Paper variant="outlined" square sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
        <Typography variant='h4'>Instructions</Typography>
        <Typography variant='p'>
          Welcome to anidle, the anime guessing game! Your goal is to guess the mystery anime. As you guess, you will uncover more information about the mystery anime, like it's top tags, genres, and a score range. Use the search bar below to start guessing!
        </Typography>
        <br/>
        <br/>
        <Typography variant='p'>
          animedle daily is updated every day, and animedle unlimited allows you to play unlimited rounds
        </Typography>
      </Paper>
    );
}
export default Instructions;