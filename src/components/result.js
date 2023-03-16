import React, { useMemo } from 'react'
import { Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import { FormGroup, styled, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled(FormGroup)(`
    width:30%;
    border-radius:10px;
    margin:5% auto 0 auto;
    & > div {
        margin-top:20px
    }
`)

export default function Result(props) {
    const { answers, restartQuiz, questions } = props;
    const navigate = useNavigate();
    const correctAnswers = useMemo(() => {
        return questions.filter((q, i) => {
            return q.correctAnswer === parseInt(answers[i]);
        }).length;
    }, [answers]);
    
    return (
        <Container>

            <Card variant="outlined" style={{ borderColor: '#1976d2' }}>
                <CardContent>
                    <Typography sx={{ display: "flex", justifyContent: "center", mb: 3 }} variant="h4" color="text.secondary">
                        Result
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "center", mb: 3 }} variant="h4" color="text.secondary">
                        {correctAnswers} / {questions.length}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={restartQuiz} variant="outlined">
                        Retry
                    </Button>
                </CardActions>
            </Card>
            <FormControl>
                <Button variant='contained' onClick={() => navigate('/')}>Go To Login Page</Button>
            </FormControl>
        </Container>
    )
}
