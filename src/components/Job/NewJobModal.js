import React, {useState, useEffect} from "react";
import {Box,IconButton, Grid,makeStyles, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, CircularProgress} from '@material-ui/core';
import { Close as CloseIcon} from '@material-ui/icons';
const useStyles = makeStyles(theme =>
    ({
        
    skillChip:{
        margin : theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
       
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,

        color: theme.palette.secondary.main,
        cursor: "pointer",
        "&:hover":{
            backgroundColor: theme.palette.secondary.main,
            color:"#fff",
        }

    },
    included: {
        backgroundColor : theme.palette.secondary.main,
        color:"#fff",
    }
    }))

    const initState = {
        title : "",
        companyName: "",
        companyUrl: "",
        location: "Remote",
        link:"",
        description:"",
        skills: [],
    }
export default (props) =>{
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState(initState);
    const handleChange = e =>
    {
        e.persist();
        setJobDetails(
            oldState =>
             ({...oldState,
            [e.target.name]:e.target.value,}))
        
    }
    const addRemoveSkill = skill =>{
        jobDetails.skills.includes(skill)
        ? //removing
        setJobDetails(oldState => ({ ...oldState, skills:oldState.skills.filter(s=>s !=skill),
        }))
        : //adding
        setJobDetails(oldState => ({...oldState, skills: oldState.skills.concat(skill)}))
    }

    const handleSubmit = async () => {
        setLoading(true);
        await props.postJob(jobDetails);
        setLoading(false);
    }

    const closeModal = () =>{
        setJobDetails(initState);
        setLoading(false);
        props.closeJobModal();
    };
    const classes= useStyles();
    const skills = [
        "Javascript",
        "React",
        "Node",
        "Vue",
        "Firebase",
        "MongoDB",
        "SQL",
    ];
    return (
        <Dialog open={props.newJobModal} fullWidth>
            <DialogTitle>
                <Box justifyContent="space-between" alignItems="center" display="flex">
                    Post Job
                <IconButton onClick={closeModal}>
                    <CloseIcon/>
                </IconButton>    
                </Box></DialogTitle>
            <DialogContent>
                <Grid container spacing ={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange}name="title" value={jobDetails.title} placeholder="Job title*" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange = {handleChange} name="type" value= {jobDetails.type} fullWidth disableUnderline variant="filled" >
                <MenuItem value="Full time">Full time</MenuItem>
                <MenuItem value="Part time">Part time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
            </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} name="companyName" value = {jobDetails.companyName}placeholder="Company Name*" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} name="companyUrl" value= {jobDetails.companyUrl} placeholder="Company URL*" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                    <Select onChange = {handleChange} name="location" value={jobDetails.location} fullWidth disableUnderline variant="filled" >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-office">In-office</MenuItem>
              </Select> </Grid>
              <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} name="link" value={jobDetails.link}placeholder="Job link*" disableUnderline fullWidth></FilledInput>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput onChange = {handleChange} name="description" value={jobDetails.description} multiline rows={4}placeholder="Job description*" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {skills.map(skill=> 
                            (
                                <Box
                                 onClick={() => addRemoveSkill(skill)}
                                 className={`${classes.skillChip} ${
                                    jobDetails.skills.includes(skill) && classes.included
                                 }`}

                                 key={skill}>{skill}</Box>
                            ))}
                    </Box>
                </Box>

            </DialogContent>
            <DialogActions>
                <Box color="red"
                alignItems="center" width="100%" display="flex" justifyContent="space-between">
                    <Typography variant="caption">*Required fields</Typography>
                    <Button 
                    disabled = {loading}
                    onClick={handleSubmit}
                    color="primary" variant="contained" disableElevation>
                        {loading?<CircularProgress/>:
                        "Post Job"}</Button>
                </Box>
                
            </DialogActions>

        </Dialog>
    )
}