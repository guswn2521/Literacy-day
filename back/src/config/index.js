// env 변수 설정 파일(dotenv의 남용 방지)
import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.SERVER_PORT,
  mongodbUrl: process.env.MONGODB_URL,
  jwtKey: process.env.JWT_SECRET_KEY,
  kakao: {
    oauthUrl: process.env.KAKAO_OAUTH_TOKEN_API_URL,
    grantType: process.env.KAKAO_GRANT_TYPE,
    clientId: process.env.KAKAO_CLIENT_ID,
    redirectUrl: process.env.KAKAO_REDIRECT_URL,
    userUrl: process.env.KAKAO_OAUTH_USER_API_URL,
  },
};

export default config;
