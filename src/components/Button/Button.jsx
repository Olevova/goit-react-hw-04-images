import * as React from 'react';
import Button from '@mui/material/Button';
import PropTypes from "prop-types";



export const ButtonLoad = ({onClickSearch}) => {
    return <div style={{display:"flex", justifyContent:"center", margin:"15px"}}>
        <Button variant="outlined" onClick={onClickSearch}>
            Search
        </Button>
        </div>

} 

ButtonLoad.propTypes ={
    onClickSearch: PropTypes.func.isRequired
}