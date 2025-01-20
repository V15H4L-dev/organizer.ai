import { Button, CircularProgress, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TopBar } from "../components";
import { UserContext } from "../contexts/UserContext";
import { getFontColor, showToast } from "../utils";
import { ColorPalette } from "../theme/themeConfig";
import { doLogin, doSignUp } from "../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const n = useNavigate();

  useEffect(() => {
    document.title = `Sign Up`;
    if (Cookies.get("token")) {
      n("/home");
    }
  }, [n]);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await doSignUp({ email, password, name });
      if (response.status === 201) {
        const loginResponse = await doLogin({ email, password });
        if (loginResponse.status === 200) {
          setUser({ ...user, name: loginResponse.data.name });
          showToast(<div>Signed Up in Successfully .</div>);
          Cookies.set("token", loginResponse?.data?.access_token);
          n("/home");
        }
      } else {
        showToast(<div>{response?.data}</div>);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast(<div>{error?.response?.data?.detail}</div>, { type: "error" });
      } else {
        showToast(<div>An unknown error occurred.</div>);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar title="User Sign Up" />
      <Container>
        <UserName translate={name ? "no" : "yes"}>{name || "User"}</UserName>
        <TextField
          sx={{ width: "300px", marginTop: "8px" }}
          label={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <TextField
          sx={{ width: "300px", marginTop: "8px" }}
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? false : true}
          helperText={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Not a valid email address"}
          autoComplete="email"
        />
        <TextField
          sx={{ width: "300px", marginTop: "8px" }}
          label={"Password"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!password}
          onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
          helperText={!password ? "Password is required." : ""}
          autoComplete="password"
        />
        <SaveBtn
          onClick={handleSignUp}
          disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || !name}
        >
          Sign Up {loading && <CircularProgress color="inherit" size={20} sx={{ px: 2 }} />}
        </SaveBtn>
      </Container>
    </>
  );
};

export default UserLogin;

const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 64px 38px;
  border-radius: 48px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => (theme.darkmode ? "#383838" : "#f5f5f5")};
  color: ${({ theme }) => (theme.darkmode ? ColorPalette.fontLight : ColorPalette.fontDark)};
  transition:
    border 0.3s,
    box-shadow 0.3s;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 72px -1px ${({ theme }) => theme.primary + "bf"};
  display: flex;
  gap: 14px;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SaveBtn = styled(Button)`
  width: 300px;
  font-weight: 600;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => getFontColor(theme.primary)};
  font-size: 18px;
  padding: 14px;
  border-radius: 16px;
  cursor: pointer;
  text-transform: capitalize;
  transition:
    background 0.3s,
    color 0.3s;
  &:hover {
    background: ${({ theme }) => theme.primary};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    color: white;
  }
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;
