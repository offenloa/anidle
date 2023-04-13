import React, { useState } from 'react';
import { Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';

import {useQuery, gql} from '@apollo/client'

function AnimeSearch({search, onChange}){
    return (
            <Paper sx={{"px": "16px", "py": "8px"}}>
                <Typography variant='h2'>AnimeSearch</Typography>
                <Box marginTop={2}>
                    <TextField id="search" variant='outlined' label="Search" value={search} onChange={onChange}></TextField>

                </Box>

            </Paper>
    );
}
export default AnimeSearch;