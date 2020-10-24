import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {ArrayMaker, QuizDifficulty} from '../services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }},
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const QuizType:React.FC<any> = ({amountCallBack, difficultyCallBack}) => {

  const classes = useStyles();

  return (
    <>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="amount of Questions">Number</InputLabel>
        <NativeSelect
          name={"No. of Questions"}
          onChange={( e => amountCallBack(e.target.value))}
        >
          <option aria-label="None" value="" />
          {ArrayMaker(1,50).map((num, id) => <option key={id}>{num}</option> )}
        </NativeSelect>
        <FormHelperText>No. of Questions</FormHelperText>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="Difficulty">Difficulty</InputLabel>
        <NativeSelect
          onChange={( e => difficultyCallBack(e.target.value))}
        >
          <option aria-label="None" value="" />
          {QuizDifficulty().map((key, id) => <option key={id}>{key}</option> )}
        </NativeSelect>
        <FormHelperText>Quiz Difficulty</FormHelperText>
      </FormControl>
    </div>
    </>
  );
}