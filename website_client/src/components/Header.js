import React, { useState } from 'react';
import { Grid, Link, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography, AppBar } from '@mui/material';

import {useQuery, gql} from '@apollo/client'
import animebank from '../animebank.json'
import { blueGrey, grey} from '@mui/material/colors';

function Header({unlimited}){
    return (
            <AppBar sx={{"px": "16px", "py": "8px", backgroundColor: grey[500]}} position='static'>
                <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                    <Grid item>
                    <img src="osaka.png" width="auto" height="72px"></img>  
                    </Grid>
                    <Grid item>
                    <Typography variant='h2'>Animedle {unlimited?"Unlimited":"Daily"}</Typography>
                    </Grid>
                    <Grid item>
                    {
                        unlimited?
                        <Link href='/'
                         underline="hover"
                         color={"#FFFFFF"}>
                        <Typography variant='h4' >Daily</Typography>
                        </Link>
                        :
                        <Link href="/unlimited" underline="hover" color={"#FFFFFF"}>
                        <Typography variant='h4'>Unlimited</Typography>
                        </Link>
                    }
                    </Grid>
                </Grid>
            </AppBar>
    );
}
export default Header;