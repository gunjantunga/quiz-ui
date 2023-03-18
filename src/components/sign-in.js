import React, { useState } from 'react';
import { FormControl, FormGroup, TextField, Typography, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services';
import { validEmail } from '../helper';

const Container = styled(FormGroup)(`
    width:30%;
    border-radius:10px;
    margin:5% auto 0 auto;
    & > div {
        margin-top:20px
    }
`)



const Signin = (props) => {
    const [user, setUser] = useState({
        password: '',
        email: ''
    });


    const navigate = useNavigate();
    const [errorObj, setErrorObj] = useState({});

    const onHandleValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    }

    const validateForm = () => {
        let errorList = {};

        if (!user.email) {
            errorList.email = "Please Provide email Id."
        }
        if (user.email) {
            if (!validEmail(user.email)) {
                errorList.email = "Please Provide a valid email Id"
            }
        }

        if (!user.password) {
            errorList.password = "Please provide a password."
        }
        if (user.password) {
            if (user.password.length > 10) {
                errorList.password = "Please provide a password less than 10 characters."
            }
        }


        if (!user.password) {
            errorList.password = "Please provide a password."
        }

        if (Object.keys(errorList).length == 0) {
            setErrorObj({});
            return true;
        } else {
            setErrorObj(errorList);
            errorList = {};
            return false;
        }

    }
    const handleLogin = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        let response = await loginUser(user);
        if (response.data.error) {
            alert(response.data.error);
        } else {
            const { user } = response.data;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                props.getAllQuestionList();
                props.setCurrentQuestionIndex(0)
                navigate('/quiz')
            }
        }
    }
    return (
        <>
            <Container>
                <Typography variant='h4'>Sign In</Typography>

                <FormControl>
                    <TextField
                        error={errorObj.email}
                        helperText={errorObj.email}
                        placeholder="Email"
                        onChange={(e) => onHandleValueChange(e)}
                        name="email"
                        type="text"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={errorObj.password}
                        helperText={errorObj.password}
                        placeholder='Password'
                        onChange={(e) => onHandleValueChange(e)}
                        name="password"
                        type="password"
                    />
                </FormControl>
                <FormControl>
                    <Button variant='contained' onClick={handleLogin}>Login</Button>
                    <div style={{ margin: 10 }}>Or</div>
                    <Button variant='contained' onClick={() => navigate('/signup')}>Register</Button>
                </FormControl>

            </Container>

        </>
    );
};

export default Signin;