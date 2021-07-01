const authReqHeaderFromCtx = (ctx) => {
  return {
    headers: {
      "x-access-token": ctx?.req?.headers?.cookie?.replace("token=", ""),
    },
  };
};

const authReqHeader = (token) => {
  return {
    headers: { "x-access-token": token },
  };
};

export { authReqHeaderFromCtx, authReqHeader };
