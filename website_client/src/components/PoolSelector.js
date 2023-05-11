import React, { useState } from 'react';
import { RadioGroup, FormLabel, FormControl, FormControlLabel, Radio, Grid, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import {useQuery, gql} from '@apollo/client'
import { blueGrey } from '@mui/material/colors';
import http from "../http-common";
import PoolService from '../services/pool';

let pool = PoolService.getBank();


function PoolSelector({setPool}){
    const [choice, setChoice] = useState("top1000");
    const [account, setAccount] = useState("");
    const [interimacc, setInterimAcc] = useState("");

    function onRadioChange(event, newValue) {
        setChoice(newValue);
        if (choice === "top1000") {
            setPool(pool);
        }
    }

    function onImport(acc) {

    }

    return (
    <Paper sx={{"px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
    <FormControl>
      <FormLabel id="pool-chooser">Choose Source</FormLabel>
      <RadioGroup
        column="true"
        aria-labelledby="pool-chooser"
        name="position"
        value={choice}
        onChange={(event, newValue)=>(setChoice(newValue))}
        defaultValue="top1000"
      >
        <FormControlLabel value="top1000" control={<Radio />} label="Top 1000" />
        <FormControlLabel value="anilist" control={<Radio />} label="Import From Anilist" />
      </RadioGroup>
    </FormControl>
    {choice == "anilist" ?
    <Grid paddingTop={1} container direction="row" alignItems="center" justifyContent="space-between">
        <Grid item>
        <TextField variant='standard' value={interimacc} onChange={(event)=>(setInterimAcc(event.target.value))} label="AniList account"/>
        </Grid>
        <Grid item>
        <Button variant='contained' onClick={()=>(onImport(interimacc))}>Import</Button>
        </Grid>
    </Grid>
    : <></>
    }
    </Paper>
    );
}
export default PoolSelector;