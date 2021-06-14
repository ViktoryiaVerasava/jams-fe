const constantMock = globalThis.fetch;

globalThis.fetch = async function () {
  let resp;
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage?.getItem("token");
  }
  if (
    (arguments["0"].includes("/jams") || arguments["0"].includes("/songs")) &&
    !arguments["1"]?.headers?.["x-access-token"]
  ) {
    const header = {
      "x-access-token": token,
    };
    const initObject = arguments["1"] ? arguments["1"] : {};
    initObject.headers = { ...(initObject.headers || {}), ...header };
    resp = await constantMock.apply(this, [arguments["0"], initObject]);
  } else {
    resp = await constantMock.apply(this, arguments);
  }
  const status = await resp.status;
  if (status === 401) {
    window.location.href = "./login";
  } else {
    return resp;
  }
};
