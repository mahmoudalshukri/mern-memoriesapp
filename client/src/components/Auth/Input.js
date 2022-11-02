import React from 'react';
import { TextField, Grid, IconButton, InputAdornment } from '@material-ui/core';
import Visbility from '@material-ui/icons/Visibility';
import VisbilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({name, label, handleChange, autoFocus, type, handleShowPassword, half }) => {
  return (
    <Grid item xs={12} sm={half? 6: 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={
                name === 'password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visbility /> : <VisbilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }:null
            }
        />
    </Grid>
  )
}

export default Input