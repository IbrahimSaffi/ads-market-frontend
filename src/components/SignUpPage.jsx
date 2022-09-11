
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiSlice, { createAccount, login } from '../slices/apiSlice';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  let goTo = useNavigate()
  let dispatch = useDispatch(apiSlice)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get('firstName') + " " + data.get('lastName')
    dispatch(createAccount({ name: name, password: data.get('password'),email:data.get('email'),confirmPassword: data.get('password') }))
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
   goTo("/auth/login")
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
// import React from 'react'
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import apiSlice, { createAccount } from '../slices/apiSlice';
// import { useDispatch } from 'react-redux';

// export default function SignUpPage() {
//   let dispatch = useDispatch(apiSlice)
//   const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(3, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     lastName: Yup.string()
//       .min(3, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
//     passwordCheck: Yup.string().test("password-match", "Passwords must match", function (value) {
//       return this.parent.password === value
//     }).required('Re-enter Password'),
//   });
//   return (
//     <div>   <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         passwordCheck: '',
//       }}
//       validationSchema={SignupSchema}
//       onSubmit={
//         values => {
//           let name = values.firstName + " " + values.lastName
//           dispatch(createAccount({name:name,password:values.password,email:values.email,confirmPassword:values.passwordCheck}))
//         }
//       }
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <div>First Name</div>
//           <Field name="firstName" />
//           {errors.firstName && touched.firstName ? (
//             <div>{errors.firstName}</div>
//           ) : null}
//           <div>Last Name</div>
//           <Field name="lastName" />
//           {errors.lastName && touched.lastName ? (
//             <div>{errors.lastName}</div>
//           ) : null}
//           <div>Enter Email</div>
//           <Field name="email" type="email" />
//           {errors.email && touched.email ? <div>{errors.email}</div> : null}
//           <div>Enter Password</div>
//           <Field name="password" type="password" />
//           {errors.password && touched.password ? (
//             <div>{errors.password}</div>
//           ) : null}
//           <div>reenter Password</div>
//           <Field name="passwordCheck" type="password" />
//           {errors.passwordCheck && touched.passwordCheck ? (
//             <div>{errors.passwordCheck}</div>
//           ) : null}
//           <button type='submit' onClick={() => console.log("clicked")}>Create Account</button>
//         </Form>
//       )}
//     </Formik></div>
//   )
// }
