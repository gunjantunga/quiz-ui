import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormGroup, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled(FormGroup)(`
    width:30%;
    border-radius:10px;
    margin:5% auto 0 auto;
    & > div {
        margin-top:20px
    }
`)


export default function QuizCard(props) {
    const { question = {}, setQuestions, questionNumber, submitAnswer, getAllQuestionList } = props;
    const [value, setValue] = React.useState(null);
    const user = window.localStorage.getItem('user') ? window.localStorage.getItem('user') : '';


    const navigate = useNavigate();

    const handleChangeRadio = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = () => {
        submitAnswer(value);
        setValue(null);
    }

    const handleLogout = () => {
        navigate('/');
        setQuestions([]);
        window.localStorage.removeItem('user')
    }

    useEffect(() => {
        if (user) {
            getAllQuestionList();
        }
    }, [user]);

    return (
        <Container >
            <Card variant="outlined" style={{ borderColor: '#1976d2' }}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Question {questionNumber}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {question.title}
                    </Typography>

                    <FormControl>
                        <RadioGroup name="radio-group-quiz" value={value} onChange={handleChangeRadio}>
                            {question.options && question.options.map((o, i) => {
                                return <FormControlLabel key={i + 1} value={i + 1} control={<Radio />} label={o.description} />
                            })}
                        </RadioGroup>
                    </FormControl>


                </CardContent>
                <CardActions>
                    <Button disabled={!value} onClick={handleSubmit} fullWidth variant="outlined" size="small">Submit</Button>
                </CardActions>
            </Card>
            <FormControl>
                <Button variant='contained' onClick={handleLogout}>Logout</Button>
            </FormControl>
        </Container>
    );
}