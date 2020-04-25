import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Container, Button, MenuItem } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  header: {
    height: "80px",
    textAlign: "left",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    marginTop: "15px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  const [state, setState] = useState({
    application: "",
    dataset: "",
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  // Date picker
  const [fromDate, setFromDate] = React.useState(
    new Date(new Date(Date.now()))
  );
  const [toDate, setToDate] = React.useState(
    new Date(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  );
  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  //Table
  const columns = [
    "Date",
    "Data Set Name",
    "Source File Name",
    "Correlation Id",
    "Application",
    "Local Execution Id",
    "Tracking Step",
    "Record Count",
    "Status",
    "Message",
  ];

  const options = {
    // filterType: 'checkbox',
  };

  const [records, setRecords] = useState([]);

  async function fetchData() {
    const res = await fetch("/dashboard");
    const all_data = await res.json();
    let all_rows = [];
    const data = all_data["dashboard_data"];
    data.map((row) => {
      let to_insert_row = [
        row.date,
        row.datasetname,
        row.source_filename,
        row.correlation_id,
        row.application,
        row.local_execution_id,
        row.tracking_step,
        row.record_count,
        row.status,
        row.message,
      ];
      return all_rows.push(to_insert_row);
    });

    setRecords(all_rows);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchRecords = () => {
    const getDataFor = {
      fromDate : fromDate,
      toDate : toDate,
      application: state.application,
      dataset : state.dataset
    }
  }

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper + " " + classes.header}>
              Logo comes here
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <FormControl style={{display: 'flex'}}>
                <Grid container justify="space-around">

                  {/* From Date */}
                  <KeyboardDatePicker
                    margin="normal"
                    id="from-date-picker"
                    label="From Date"
                    format="dd/MM/yyyy"
                    value={toDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "From Date",
                    }}
                  />

                  {/* To Date */}
                  <KeyboardDatePicker
                    margin="normal"
                    id="to-date-picker"
                    label="To Date"
                    format="dd/MM/yyyy"
                    value={fromDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "To Date",
                    }}
                  />

                  {/* Application */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Application</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state.application}
                      onChange={handleChange("application")}
                      name="application"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </FormControl>
                  {/* Dataset */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id="datase-select-label">Dataset</InputLabel>
                    <Select
                      labelId="datase-select-label"
                      id="datase-select"
                      value={state.dataset}
                      onChange={handleChange("dataset")}
                      name="dataset"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Search Feild */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: "40px", marginTop: "20px" }}
                    onClick={fetchRecords}
                  >
                    Submit
                  </Button>
                  </Grid>

                  </FormControl>

              </MuiPickersUtilsProvider>
            </Paper>
            <br />

            <MUIDataTable
              title={"All Job List"}
              data={records}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}

export default App;