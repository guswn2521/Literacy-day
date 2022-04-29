import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomSnackbar, errorAlert } from "../../../components/CustomSnackbar";
import { Copyright } from "../../../components/Copyright";
import { useState } from "react";
import { validation } from "../../../utils/validation";
import { post } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const registerFailMessage = "회원가입에 실패하셨습니다.";

/**
 * 유저의 회원가입을 담당하는 컴포넌트 입니다.
 * @param onSubmit 테스트를 위한 모의함수입니다.
 * @returns {JSX.Element}
 * @constructor
 */
function Register({ onSubmit = () => {} }) {
  const navigate = useNavigate();
  const initialInfo = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  };
  const [registerInfo, setRegisterInfo] = useState(initialInfo);
  const [showAlert, setShowAlert] = useState(false);
  const isActive = validation("register", registerInfo);
  const registerFailData = errorAlert(
    showAlert,
    setShowAlert,
    registerFailMessage
  );

  const handleOnChange = (e) => {
    setRegisterInfo((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    onSubmit();

    const { email, password, nickname } = registerInfo;
    try {
      await post("user/register", { email, password, nickname });
      setRegisterInfo(initialInfo);
      navigate("/user/login");
    } catch (err) {
      setShowAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomSnackbar {...registerFailData} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="register-email"
                  label="Email Address"
                  name="email"
                  onChange={handleOnChange}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="register-password"
                  onChange={handleOnChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={handleOnChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="nickname"
                  label="Nickname"
                  type="text"
                  id="nickName"
                  onChange={handleOnChange}
                  autoComplete="nickName"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isActive}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => navigate("/user/login")}>
                  이미 계정이 있으신가요?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Register;
