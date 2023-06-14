import React, { useState } from 'react';
import { RadioGroup, FormLabel, FormControl, FormControlLabel, Radio, Grid, Autocomplete, Box, Button, Card, Container, Paper, TextField, Typography } from '@mui/material';
import {useQuery, gql} from '@apollo/client'
import { blueGrey } from '@mui/material/colors';
import http from "../http-common";
import PoolService from '../services/pool';

let pool = PoolService.getBank();


function PoolSelector({setPoolTop, setPoolAcc}){
    const [choice, setChoice] = useState("top1000");
    const [account, setAccount] = useState("");
    const [interimacc, setInterimAcc] = useState("");

    function onRadioChange(event, newValue) {
        setChoice(newValue);
        if (newValue === "top1000") {
          setPoolTop();
          console.log("setting to top")
        }
    }

    function onImport(acc) {
      setAccount(acc);
      setPoolAcc(acc);
    }

    return (
    <Paper variant="outlined" square sx={{"height": 1, "px": "16px", "py": "8px", backgroundColor: blueGrey[50]}}>
    <FormControl>
      <FormLabel id="pool-chooser">Choose Source</FormLabel>
      <RadioGroup
        column="true"
        aria-labelledby="pool-chooser"
        name="position"
        value={choice}
        onChange={(event, newValue)=>(onRadioChange(event, newValue))}
        defaultValue="top1000"
      >
        <FormControlLabel value="top1000" control={<Radio />} label="Top 500" />
        <FormControlLabel value="anilist" control={<Radio />} label="Import From Anilist" />
      </RadioGroup>
    </FormControl>
    {choice == "anilist" ?
    <Grid paddingTop={1} container direction="row" alignItems="center" justifyContent="space-between">
        <Grid item>
        <TextField variant='standard' value={interimacc} onChange={(event)=>(setInterimAcc(event.target.value))} label="AniList account"/>
        </Grid>
        <Grid item>
        <Button variant='contained' className='bg-gradient-to-r from-fuchsia-500 to-cyan-500' onClick={()=>(onImport(interimacc))}>Import</Button>
        </Grid>
        <p style={{color: "gray", fontSize: "12px"}}>{account? `using anilist account: ${account} (or top 500 if account doesn't exist)`:""}</p>
    </Grid>
    : <></>
    }
    </Paper>
    );
}
export default PoolSelector;