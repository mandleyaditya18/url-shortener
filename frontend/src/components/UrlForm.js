import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { useRef, useState } from "react";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    label: {
        marginTop: '1em',
        marginBottom: '0em'
    },
    form: {
        minWidth: '40%'
    },
    root: {
        background: 'white'
    },
    input: {
        color: 'black'
    }
}));

const UrlForm = (props) => {
    const classes = useStyles();
    const urlRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resData, setResData] = useState({});

    const submitHandler = async (event) => {
        event.preventDefault();
        const fullUrl = {fullUrl: urlRef.current.value};
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/shortUrl',
                data: fullUrl,
            });

            if (response.statusText !== 'OK') {
                throw new Error('Request Failed');
            }

            const data = await response.data;
            
            if (data.code === 11000) {
                throw new Error('Link already shrinked');
            }
            setResData(data);           
        }
        catch (error) {
            setError(error.message || 'Something went wrong');
        }
        props.formOnSubmit(resData);
        setIsLoading(false);
    }

    return (
        <Grid container spacing={10} style={{paddingTop: 30}}>
            <Grid container item xs={12} alignItems='center' direction='column' style={{padding: 10}}>
                <h1>URL Shortener</h1>

                <form className={classes.form} onSubmit={submitHandler}>
                    <h3 className={classes.label}>Enter URL</h3>
                    <TextField
                        label='Enter URL' 
                        margin='normal'
                        variant='filled'
                        className={classes.root}
                        InputProps={{
                            className: classes.input
                        }}
                        inputRef={urlRef}
                        fullWidth={true} 
                    />
                    <Button color='default' variant='contained' fullWidth={true} type='submit'>
                        Submit
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default UrlForm;