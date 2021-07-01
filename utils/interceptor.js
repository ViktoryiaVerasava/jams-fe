const constantMock = globalThis.fetch;

globalThis.fetch = async function () {
  let resp = await constantMock.apply(this, arguments);

  const status = await resp.status;
  if (status === 401 && typeof window !== "undefined") {
    window.location.href = "./login";
  } else {
    return resp;
  }
};
