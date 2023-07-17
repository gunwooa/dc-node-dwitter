import dotenv from "dotenv";

dotenv.config();

// .env에 선언되었는지 체크, 런타임때 error 확인하기 위한 코드
const required = (key, defaultValue = undefined) => {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`.env : ${key} is undefined`);
  }
  return value;
};

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    host: required("DB_HOST"),
  },
};
