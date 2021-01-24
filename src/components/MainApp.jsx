import React, { useEffect, useState } from "react";
import "./MainApp.css";
import LineGraph from "./LineGraph";
import StatsCard from "./StatsCard";
import axios from "./axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function MainApp() {
  const classes = useStyles();

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [country, setCountry] = useState("");
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/summary`)
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.TotalRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setCovidSummary(res.data);
        }

        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  };

  const countryHandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - 30));
    getStatsbyDateRange(e.target.value, from, to);
  };

  const getStatsbyDateRange = (countrySlug, from, to) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log(res);
        const yAxisCoronaCount = res.data.map((d) => d.Cases);
        const xAxisLabel = res.data.map((d) => d.Date);
        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug
        );
        setCoronaCountAr(yAxisCoronaCount);
        setTotalConfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.TotalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <h4>Loading data from the API...!</h4>;
  }

  return (
    <div className="MainApp">
      <div>
        <div>
          <StatsCard
            totalConfirmed={totalConfirmed}
            totalRecovered={totalRecovered}
            totalDeaths={totalDeaths}
            country={country}
          />
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={country}
                onChange={countryHandler}
              >
                {covidSummary.Countries &&
                  covidSummary.Countries.map((country) => (
                    <MenuItem key={country.Slug} value={country.Slug}>
                      {country.Country}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Select Country for Covid-19 Stats</FormHelperText>
            </FormControl>
          </div>
        </div>
      </div>
      <LineGraph yAxis={coronaCountAr} label={label} />
    </div>
  );
}

export default MainApp;
