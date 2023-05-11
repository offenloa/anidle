import React, { useState } from 'react';
import { Box, Button, Card, CardHeader, CardMedia, Container, Paper, TextField, Typography } from '@mui/material';


function AnimeTile({ani}){


    return (
        <a href={ani.siteUrl}>
            <Card sx={{"maxWidth": "230px"}}>
                <CardMedia height="100" image={ani.coverImage.large} sx={{"height": "329px", "width": "230px", "objectFit": "contain"}}></CardMedia>
                <CardHeader title={ani.title.romaji} />
            </Card>
        </a>
    );
}
export default AnimeTile;