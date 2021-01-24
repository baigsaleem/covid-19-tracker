import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "0 auto",
    marginTop: 5,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "#3f51b5",
  },
  title1: {
    color: "#A21818",
  },
  title2: {
    color: "#1C5F2C",
  },
  number: {
    color: "#252525",
  },
}));

export default function StatsCard(props) {
  const classes = useStyles();
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props;

  return (
    <div className={classes.root}>
      <h2 style={{ textTransform: "capitalize", margin: "1px auto" }}>
        {country === "" ? "Global" : country}
      </h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>
            <h2 className={classes.title}>Total Confirmed</h2>
            <h2 className={classes.number}>
              <CountUp
                start={0}
                end={totalConfirmed}
                duration={2}
                separator=","
              />
            </h2>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>
            <h2 className={classes.title1}>Total Deaths</h2>
            <h2 className={classes.number}>
              <CountUp start={0} end={totalDeaths} duration={2} separator="," />
            </h2>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>
            <h2 className={classes.title2}>Total Recovered</h2>
            <h2 className={classes.number}>
              <CountUp
                start={0}
                end={totalRecovered}
                duration={2}
                separator=","
              />
            </h2>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
