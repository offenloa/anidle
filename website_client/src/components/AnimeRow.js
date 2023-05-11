import React, { useEffect, useState } from 'react';
import { Chip, TableRow, Box, Button, Card, CardHeader, CardMedia, Container, Paper, TableCell, TextField, Typography } from '@mui/material';
import { red, green} from '@mui/material/colors';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function AnimeRow({ani, answerPromise, setGameOver}){
    const incorrect = red[200];
    const correct = green[200];
    const [results, setResults] = useState({})

    

    console.log(ani);

    useEffect(() => {
        const getResults = async () => {

            let answer = await answerPromise;

            let interimResults = {}
            interimResults.yearGuess = <Chip sx={{backgroundColor: ani.seasonYear == answer.seasonYear ? correct : incorrect}} label={ani.seasonYear} icon={ani.seasonYear === answer.seasonYear? "" : ani.seasonYear < answer.seasonYear? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}></Chip>

            interimResults.episodeGuess = <Chip sx={{backgroundColor: ani.episodes == answer.episodes ? correct : incorrect}} label={ani.episodes} icon={ani.episodes === answer.episodes? "" : ani.episodes < answer.episodes? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}></Chip>

            let answerStudios = []
            if (answer.studios!= null) {
                answerStudios = answer.studios.nodes.filter((studio) => (studio.isAnimationStudio))
                    .map((studio) => (studio.name));
            }
            interimResults.studioGuess = ani.studios.nodes.filter((studio) => (studio.isAnimationStudio)).map((studio) => (
                <Chip sx={{backgroundColor: answerStudios.includes(studio.name)? correct : incorrect}} label={studio.name}></Chip>
            ))
            
            interimResults.seasonGuess = <Chip sx={{backgroundColor: ani.season === answer.season ? correct : incorrect}} label={ani.season}></Chip>

            interimResults.scoreGuess = <Chip sx={{backgroundColor: ani.averageScore == answer.averageScore ? correct : incorrect}} label={ani.averageScore} icon={ani.averageScore === answer.averageScore? "" : ani.averageScore < answer.averageScore? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}></Chip>

            interimResults.titleGuess = <Chip sx={{backgroundColor: ani.id === answer.id ? correct : incorrect, height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            }}} label={ani.title.english != null ? ani.title.english : ani.title.romaji}></Chip>

            let aniTags = ani.tags.filter((tag) => {
                return (!tag.isGeneralSpoiler && !tag.isMediaSpoiler)
            }).slice(0, 5);

            let answerTags = answer.tags.filter((tag) => {
                return (!tag.isMediaSpoiler && !tag.isGeneralSpoiler)
            }).map((tag) => (tag.name));

            interimResults.genreGuess = ani.genres.map((genre) => (<Chip sx={{backgroundColor: answer.genres.includes(genre) ? correct : incorrect}} label={genre}></Chip>))

            interimResults.tagGuess = aniTags.map((tag) => (<Chip sx={{backgroundColor: answerTags.includes(tag.name) ? correct : incorrect}} label={tag.name+"-"+tag.rank}></Chip>))

            if (ani.id === answer.id) {
                setGameOver(true);
            }

            setResults(interimResults);
        };

        getResults();

    }, []);

    return (
        <>
            <TableCell align='center'>
                <a href={ani.siteUrl}><img src={ani.coverImage.medium}/></a>
            </TableCell>
            <TableCell align='center'>
                {results.titleGuess}
            </TableCell>
            <TableCell align='center'>
                {results.yearGuess}
            </TableCell>
            <TableCell align='center'>
                {results.seasonGuess}
            </TableCell>
            <TableCell align='center'>
                {results.episodeGuess}
            </TableCell>
            <TableCell align='center'>
                {results.scoreGuess}
            </TableCell>
            <TableCell align='center'>
                {results.studioGuess}
            </TableCell>
            <TableCell align='center'>
                {results.genreGuess}
            </TableCell>
            <TableCell align='center'>
                {results.tagGuess}
            </TableCell>
        </>
    );
}
export default AnimeRow;