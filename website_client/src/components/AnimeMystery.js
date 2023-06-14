import React, { useState, useEffect } from 'react';
import { Table, Chip, TableBody, Grid, Box, Button, Card, Container, Paper, TextField, Typography, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import AnimeRow from './AnimeRow';
import {useQuery, gql} from '@apollo/client';
import { blueGrey, green, lightBlue } from '@mui/material/colors';


function AnimeMystery({answerPromise, guesses, revealTags, setRevealTags}){
    const correct = green[900];
    const [mystery, setMystery] = useState({})
    const [answer, setAnswer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getMystery = () => {
        answerPromise.then((answerResult) => {
            setAnswer(answerResult);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getMystery()
    }, [answerPromise])

    if (isLoading) {
        return <></>
    } else {

        if (guesses.length == 0) {
            mystery.titleRevealed = false;
            mystery.imageRevealed = false;
            mystery.yearRevealed = false;
            mystery.yearMin = 0;
            mystery.yearMax = 9999;
            mystery.seasonRevealed = false;
            mystery.episodeRevealed = false;
            mystery.episodeMin = 1;
            mystery.episodeMax = 9999;
            mystery.scoreRevealed = false;
            mystery.scoreMin = 0;
            mystery.scoreMax = 100;
            mystery.studio = false;
            mystery.image = false;
            mystery.image = false;
            mystery.title = <Chip sx={{ height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            }}} label={(answer.title.english != null ? answer.title.english : answer.title.romaji).replace(/[^\s]/g, "_")}></Chip>
            mystery.image = <Box sx={{ width: 100, height: 142, backgroundColor: blueGrey[500]}}><Typography py={5.5} align='center' color={lightBlue[100]} variant='h3'>?</Typography></Box>
            mystery.year = <Chip label="0000-9999"></Chip>
            mystery.season = <Chip label="_____"></Chip>
            mystery.episode = <Chip label="1-9999"></Chip>
            mystery.score = <Chip label="0-100"></Chip>
            mystery.studio = answer.studios.nodes.filter((studio) => (studio.isAnimationStudio)).map((studio) => (
                <Chip key={(studio.name)} label={studio.name.replace(/[^\s]/g, "_")}></Chip>
            ))
            mystery.genres = answer.genres.map((genre) => (<Chip key={genre} label={genre.replace(/[^\s]/g, "_")}></Chip>))
            let answerTags = answer.tags.filter((tag) => {
                return (!tag.isMediaSpoiler && !tag.isGeneralSpoiler)
            }).slice(0,5);
            mystery.tags = answerTags.map((tag) => ((revealTags)? <Chip key={tag.name} sx={{backgroundColor: correct}} label={tag.name+"-"+tag.rank}></Chip> :<Chip key={tag.name} label={tag.name.replace(/[^\s]/g, "_")}></Chip>))
        } else {
            let latestGuess = guesses[0];
            if (latestGuess.id == answer.id) {
                mystery.title = <Chip sx={{ backgroundColor: correct, height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                }}} label={(answer.title.english != null ? answer.title.english : answer.title.romaji)}></Chip>
                mystery.titleRevealed = true;
                mystery.image = <a href={latestGuess.siteUrl}><Box sx={{ width: 100, height: 142}}><img src={latestGuess.coverImage.medium}/></Box></a>;
            }
            
            if (latestGuess.seasonYear == answer.seasonYear){
                mystery.yearRevealed = true;
                mystery.year = <Chip sx={{backgroundColor: correct}} label={answer.seasonYear}></Chip>
            } else if (!mystery.yearRevealed && latestGuess.seasonYear < answer.seasonYear) {
                mystery.yearMin = Math.max(latestGuess.seasonYear+1, mystery.yearMin);
                mystery.year = <Chip label={mystery.yearMin+"-"+mystery.yearMax}></Chip>
            } else if (!mystery.yearRevealed && latestGuess.seasonYear > answer.seasonYear) {
                mystery.yearMax = Math.min(latestGuess.seasonYear-1, mystery.yearMax);
                mystery.year = <Chip label={mystery.yearMin+"-"+mystery.yearMax}></Chip>
            }

            if (!mystery.seasonRevealed && latestGuess.season === answer.season) {
                mystery.seasonRevealed = true;
                mystery.season = <Chip sx={{backgroundColor: correct}} label={answer.season}></Chip>
            }

            if (!mystery.episodeRevealed && latestGuess.episodes == answer.episodes){
                mystery.episodeRevealed = true;
                mystery.episode = <Chip sx={{backgroundColor: correct}} label={answer.episodes}></Chip>
            } else if (!mystery.episodeRevealed && latestGuess.episodes < answer.episodes) {
                mystery.episodeMin = Math.max(latestGuess.episodes+1, mystery.episodeMin);
                mystery.episode = <Chip label={mystery.episodeMin+"-"+mystery.episodeMax}></Chip>
            } else if (!mystery.episodeRevealed && latestGuess.episodes > answer.episodes) {
                mystery.episodeMax = Math.min(latestGuess.episodes-1, mystery.episodeMax);
                mystery.episode = <Chip label={mystery.episodeMin+"-"+mystery.episodeMax}></Chip>
            }

            if (!mystery.scoreRevealed && latestGuess.averageScore == answer.averageScore){
                mystery.scoreRevealed = true;
                mystery.score = <Chip sx={{backgroundColor: correct}} label={answer.averageScore}></Chip>
            } else if (!mystery.scoreRevealed && latestGuess.averageScore < answer.averageScore) {
                mystery.scoreMin = Math.max(latestGuess.averageScore+1, mystery.episodeMin);
                mystery.score = <Chip label={mystery.scoreMin+"-"+mystery.scoreMax}></Chip>
            } else if (!mystery.scoreRevealed && latestGuess.averageScore > answer.averageScore) {
                mystery.scoreMax = Math.min(latestGuess.averageScore-1, mystery.scoreMax);
                mystery.score = <Chip label={mystery.scoreMin+"-"+mystery.scoreMax}></Chip>
            }

            let studioPool = guesses.reduce((r, guess) => {
                guess.studios.nodes.filter((studio) => (studio.isAnimationStudio)).map((studio) => (r.push(studio.name)));
                return r;
            }, []);

            let answerStudios = answer.studios.nodes.filter((studio) => (studio.isAnimationStudio));

            let sieve = answerStudios.map((studio) => (studioPool.includes(studio.name)))

            mystery.studio = answerStudios.map((studio, idx) => (sieve[idx]?<Chip key={studio.name} sx={{backgroundColor: correct}} label={studio.name}></Chip> :<Chip key={studio.name} label={studio.name.replace(/[^\s]/g, "_")}></Chip>))

            let genrePool = guesses.reduce((r, guess) => {
                guess.genres.map((genre) => (r.push(genre)));
                return r;
            }, []);

            sieve = answer.genres.map((genre) => (genrePool.includes(genre)))

            mystery.genres = answer.genres.map((genre, idx) => (sieve[idx]? <Chip key={genre} sx={{backgroundColor: correct}} label={genre}></Chip> :<Chip key={genre} label={genre.replace(/[^\s]/g, "_")}></Chip>))

            let answerTags = answer.tags.filter((tag) => {
                return (!tag.isMediaSpoiler && !tag.isGeneralSpoiler)
            }).slice(0,5);
            let tagPool = guesses.reduce((r, guess) => {
                guess.tags.map((tag) => {
                    if (!tag.isMediaSpoiler && !tag.isGeneralSpoiler) {
                        r.push(tag.name);
                    }
                });
                return r;
            }, []);

            sieve = answerTags.map((tag) => (tagPool.includes(tag.name)));

            mystery.tags = answerTags.map((tag, idx) => ((sieve[idx] || revealTags)? <Chip key={tag.name} sx={{backgroundColor: correct}} label={tag.name+"-"+tag.rank}></Chip> :<Chip key={tag.name} label={tag.name.replace(/[^\s]/g, "_")}></Chip>))

        }

    return (
        <Paper variant="outlined" square sx={{"px": "16px", "py": "8px"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}} >
                <Typography variant='h4'>Mystery Anime</Typography>
                <Button variant='contained' style={{color: "white"}} disabled={revealTags} className={revealTags?"text-white bg-gray-400":'text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500'} onClick={() => (setRevealTags(true))}>Reveal Tags</Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                Title
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
                    <TableRow hover tabIndex={-1}>
                        <TableCell align='center'>
                            {mystery.image}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.title}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.year}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.season}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.episode}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.score}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.studio}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.genres}
                        </TableCell>
                        <TableCell align='center'>
                            {mystery.tags}
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
    }
}
export default AnimeMystery;