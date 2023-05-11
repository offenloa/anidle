import React, { useState } from 'react';
import { Table, TableBody, Grid, Box, Button, Card, Container, Paper, TextField, Typography, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';

import AnimeRow from './AnimeRow';
import {useQuery, gql} from '@apollo/client';
import { blueGrey } from '@mui/material/colors';
import MAL_CLIENT_ID from "../malclient.json";

import axios from 'axios';

const AL_ANIME_QUERY = gql`
query($id: Int) {
    Page(page: 1, perPage: 1) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media (id: $id, sort: SCORE_DESC, type: ANIME) {
        id
        averageScore
        episodes
        season
        seasonYear
        genres
        coverImage {
            medium
            color
        }
        siteUrl
        title {
          romaji
          english
        }
        studios (isMain: true) {
          nodes {
            id
            name
            isAnimationStudio
          }
        }
        tags {
          name
          rank
        isGeneralSpoiler
        isMediaSpoiler
        }
      }
    }
  }
`;

const MAL_ANIME_QUERY = `https://api.myanimelist.net/v2/anime?`;

const HTTP_MAL_QUERY = `GET /v2/anime?q=one&limit=4 HTTP/1.1
Host: api.myanimelist.net
X-MAL-CLIENT-ID: 936f5b95b86b05f81a051b9dece15999

`

function AnimeList({search, answer, guesses, setGameOver}){
    const { loading, error, data } = useQuery(AL_ANIME_QUERY, {
        variables: {"id": search}
    });

    const useMal = false;

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    let tableItems;
    if (data.Page.media[0]) {
        var mutable = [];
        let guess = data.Page.media[0];
        if (!guesses.some(element => {
            if (element.id === guess.id) {
                return true;
            }
            return false;
        })) {
            guesses.unshift(guess);
        }
    }
    tableItems = guesses.map((ani) => (
        <TableRow hover key={ani.id} tabIndex={-1}>
            <AnimeRow key={ani.id} ani={ani} answerPromise={answer} setGameOver={setGameOver}/>
        </TableRow>
    ))
    
    if (guesses.length == 0) {
        return (
            <Paper sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
            <Typography variant='h4'>Guess an anime to begin!</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
            <Typography variant='h4'>History ({guesses.length} guess{guesses.length>1?"es":""})</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                Guess
                            </TableCell>
                            <TableCell align="center">
                                Year
                            </TableCell>
                            <TableCell align="center">
                                Season
                            </TableCell>
                            <TableCell align="center">
                                Episodes
                            </TableCell>
                            <TableCell align="center">
                                Score
                            </TableCell>
                            <TableCell align="center">
                                Studio(s)
                            </TableCell>
                            <TableCell align="center">
                                Genres
                            </TableCell>
                            <TableCell align="center">
                                Tags
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableItems}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
export default AnimeList;