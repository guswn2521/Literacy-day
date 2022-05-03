import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CustomSnackbar, setAlertData } from "./CustomSnackbar";
import { SUCCESS_MESSAGE, ALERT_TYPE, LABEL } from "../utils/constants";
import { img } from "../utils/imgImport";
import {
  HeaderContainer,
  LogoContainer,
  Navigation,
  NavList,
} from "../styles/Components/ComponentStyle";
import SearchContent from "./Search/SearchContent";

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState, isLogin } = queryClient.getQueryData("userState");
  const [value, setValue] = useState("one");
  const [showAlert, setShowAlert] = useState(false);

  const userId = isLogin ? userState._id : null;

  const logoutSuccessData = setAlertData(
    showAlert,
    setShowAlert,
    SUCCESS_MESSAGE.LOGOUT,
    ALERT_TYPE.SUCCESS
  );

  const LoginRegisterTab =
    window.location.pathname === "/user/login" ? (
      <NavList onClick={() => navigate("/user/register")}>
        {LABEL.REGISTER}
      </NavList>
    ) : (
      <NavList onClick={() => navigate("/user/login")}>{LABEL.LOGIN}</NavList>
    );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("userToken");
    queryClient.invalidateQueries("userState");
    setShowAlert(true);
    navigate("/");
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <img
          onClick={() => navigate("/")}
          src={img.logoHeader}
          alt="logo"
          width="200px"
        ></img>
      </LogoContainer>
      <SearchContent />
      <Navigation onChange={handleChange}>
        <NavList
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          {LABEL.SERVICE_INTRODUCE}
        </NavList>
        <NavList
          onClick={(e) => {
            e.preventDefault();
            navigate("/posts");
          }}
        >
          {LABEL.POST}
        </NavList>
        {isLogin ? (
          <>
            <NavList onClick={() => navigate(`/user/${userId}`)}>
              {LABEL.PROFILE}
            </NavList>
            <NavList onClick={handleUserLogout}>{LABEL.LOGOUT}</NavList>
          </>
        ) : (
          LoginRegisterTab
        )}
      </Navigation>
      <CustomSnackbar {...logoutSuccessData} />
    </HeaderContainer>
  );
}

export default Header;
