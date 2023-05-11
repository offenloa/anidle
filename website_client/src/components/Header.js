import React, { useState } from 'react';
import { Grid, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';

import {useQuery, gql} from '@apollo/client'
import animebank from '../animebank.json'
import { blueGrey } from '@mui/material/colors';

function Header(){
    return (
            <Paper sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
                <Grid paddingTop={1} container direction="row" alignItems="bottom" justifyContent="space-between">
                    <Grid item>
                    <Typography variant='h2' justifyContent="bottom">Anime Guessing Game</Typography>
                    </Grid>
                    <Grid item>
                    <img src="osaka.png" width="100px" height="auto"></img>  
                    </Grid>
                </Grid>
            </Paper>
    );
}
export default Header;