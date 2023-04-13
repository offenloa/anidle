import React, { useState } from 'react';
import { Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import AnimeSearch from './AnimeSearch';
import AnimeList from './AnimeList';

function AnimeHome(){
    const [query, setQuery] = useState("")

    function onchange(e) {
        setQuery(e.target.value);
    }

    return (
        <Container maxWidth='lg'>
            <AnimeSearch submit={query} onChange={onchange}/>
            <br/>
            <AnimeList search={query} />
        </Container>
    );
}
export default AnimeHome;