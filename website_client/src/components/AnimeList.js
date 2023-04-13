import React, { useState } from 'react';
import { Grid, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';

import AnimeTile from './AnimeTile';
import {useQuery, gql} from '@apollo/client'

const ANIME_QUERY = gql`
query($page: Int, $search: String) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media (search: $search, sort: SCORE_DESC) {
        id
        averageScore
        episodes
        coverImage {
            large
            color
        }
        title {
          romaji
        }
        
      }
    }
  }
`;

function AnimeList({search}){
    const { loading, error, data } = useQuery(ANIME_QUERY, {
        variables: {search}
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <Paper sx={{"px": "16px", "py": "8px"}}>
            <Typography variant='h4'>Results</Typography>
            <Grid container spacing={2}>
                {data.Page.media.map((ani) => (
                    <Grid item xs={6} md={3}>
                        <div>
                        <AnimeTile key={ani.id} ani={ani} />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}
export default AnimeList;