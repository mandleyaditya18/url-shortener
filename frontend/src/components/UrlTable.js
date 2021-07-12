import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: 900
    },
    head: {
        fontSize: 20
    }
});

const UrlTable = (props) => {
    const classes = useStyles();
    const [allUrls, setAllUrls] = useState([]);

    const getUrlHandler = async () => {
        try {
            const response = await axios.get('http://localhost:5000/');
            const data = await response.data;
            setAllUrls(data);
        }
        catch (error) {
            console.log('getUrlHandler error',error);
        }
    }

    useEffect(() => {
        getUrlHandler();
    }, []);

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head} >Full URL</TableCell>
                        <TableCell className={classes.head} align='center'>Short URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUrls.map((allUrl) => (
                        <TableRow key={allUrl._id}>
                            <TableCell  component="th" scope="row">{allUrl.fullUrl}</TableCell>
                            <TableCell align='center'>{allUrl.shortUrl}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UrlTable;