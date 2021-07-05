const jwt = require("jsonwebtoken");

const getTokenFromCtx = (ctx) => ctx.req.headers.cookie?.replace("token=", "");
const getIsAuthenticated = (token) => {
  try {
    return token && jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    console.log(e);
  }
};

const getAuthServerSideProps = async (ctx) => {
  const token = getTokenFromCtx(ctx);
  const isAuthenticated = getIsAuthenticated(token);
  if (isAuthenticated?.id) {
    return { props: { token } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};

const getAuthServerSidePropsForSignInUpRoutes = (ctx) => {
  const token = getTokenFromCtx(ctx);
  const isAuthenticated = getIsAuthenticated(token);
  if (isAuthenticated?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: { token },
    };
  } else {
    return {
      props: {},
    };
  }
};

export { getAuthServerSideProps, getAuthServerSidePropsForSignInUpRoutes };
