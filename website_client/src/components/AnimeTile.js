import React, { useState } from 'react';
import { Box, Button, Card, CardHeader, CardMedia, Container, Paper, TextField, Typography } from '@mui/material';


function AnimeTile({ani}){


    return (
        <Card>
            <CardMedia height="100" image={ani.coverImage.large} sx={{"height": "329px", "width": "230px", "objectFit": "contain"}}></CardMedia>
            <CardHeader title={ani.title.romaji} />
        </Card>
    );
}
export default AnimeTile;