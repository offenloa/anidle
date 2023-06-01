import React, { useState } from 'react';
import { Grid, Link, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography, AppBar } from '@mui/material';

import {useQuery, gql} from '@apollo/client'
import animebank from '../animebank.json'
import { blueGrey, grey} from '@mui/material/colors';

function Footer(){
    return (
            <AppBar sx={{"px": "16px", "py": "8px", "position": "fixed", "bottom": 0}} className="bg-gradient-to-r from-fuchsia-500 to-cyan-500" position='static'>
                <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Grid item>
                    <Typography variant='p' color={grey[50]}>Copyright ©2023 ayden offenloch</Typography>
                    </Grid>
                </Grid>
            </AppBar>
    );
}
export default Footer;