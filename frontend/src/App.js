import { useEffect, useState } from 'react'; 
import UrlForm from './components/UrlForm';
import { Grid, makeStyles } from '@material-ui/core';
import UrlTable from './components/UrlTable';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}));

function App() {
  const classes = useStyles();
  const [shortUrl, setShortUrl] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (shortUrl !== '') {
      const temp_url = shortUrl;
      setUrl(temp_url)
    }
  },[setUrl, shortUrl]);

  const shortUrlHandler = (response) => {
    if (response.shortUrl) {
      setShortUrl(response.shortUrl);
    }
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid container item justifyContent='center' alignItems='center'>
        <UrlForm formOnSubmit={shortUrlHandler} />
      </Grid>
      <Grid container item justifyContent='center' alignItems='center' style={{paddingTop: 30}}>
        <div style={{height: 30}} />
        <h1>Your Short URL :    
          <a 
          href={shortUrl}
          target="_blank"
          className={classes.link}
          >
            {url}
          </a>
        </h1>
      </Grid>
      <Grid container item justifyContent='center' alignItems='center'>
        <UrlTable />
      </Grid>
    </Grid>
  );
}

export default App;
