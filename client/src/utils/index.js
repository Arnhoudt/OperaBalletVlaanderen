import Cookies from "js-cookie";

const decodeJWT = jwt => {
  const base64Url = jwt.split(`.`)[1];
  const base64 = base64Url.replace(/-/g, `+`).replace(/_/g, `/`);
  return JSON.parse(window.atob(base64));
};

const getRandomFromCookie = () => {
  const token = Cookies.get(`token`);
  if (token) {
    return decodeJWT(token);
  }
  return null;
};

const getUserFromCookie = () => {
  const tokenUser = Cookies.get(`tokenUser`);
  if (tokenUser) {
    return decodeJWT(tokenUser);
  }
  return null;
};

const getAdminFromCookie = () => {
  const tokenAdmin = Cookies.get(`tokenAdmin`);
  if (tokenAdmin) {
    return decodeJWT(tokenAdmin);
  }
  return null;
};

export { getUserFromCookie, getAdminFromCookie, getRandomFromCookie };
