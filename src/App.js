import React, {useState, useEffect} from "react";
import { Box, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import jobData from './dummyData';
import {firestore, app} from './firebase/config';

import firebase from "firebase";
import { toDate } from "date-fns";

export default () => {
  const [jobs,setJobs] =useState([]);
  const [loading, setloading]= useState(true);
  const [newJobModal,setNewJobModal] = useState(false);
  const fetchJobs = async() => {
    const req = await firestore
    .collection('jobs')
    .orderBy('postedOn','desc')
    .get();
    const tempJob = req.docs.map((job) => ({...job.data(),id:job.id, postedOn: job.data().postedOn.toDate()}));
    setJobs(tempJob);
    setloading(false);
  }

  const postJob = async jobDetails => {
    await firestore.collection('jobs')
    .add({...jobDetails, postedOn: 
       app.firestore.FieldValue.serverTimestamp()
    }) 
    fetchJobs();   
  }

  useEffect(()=> {
    fetchJobs();
  }, [])
  return <ThemeProvider theme={theme}>
    <Header openNewJobModal={()=> setNewJobModal(true)} />
    <NewJobModal closeJobModal={() => setNewJobModal(false)} newJobModal={newJobModal} postJob= {postJob}/>
    <Grid container justify="center">
      <Grid item xs = {10}>
        <SearchBar/>

        {
          loading? 
          (<Box display="flex" justifyContent="center"><CircularProgress/></Box>)
        :
        jobs.map((job) =>
        (
          <JobCard key={job.id} {...job}/>

        ))
        }


        

      </Grid>
    </Grid>

  </ThemeProvider>
};
