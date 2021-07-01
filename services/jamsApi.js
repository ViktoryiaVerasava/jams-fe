import { authReqHeader } from "../utils/authReqHeader";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const getJams = async (type, token) => {
  const jamsRespose = await fetch(
    `${BE_URL}/jams${type ? `?${type}=true` : ""}`,
    authReqHeader(token)
  );
  const { data } = await jamsRespose?.json();
  return data;
};

const createJam = async (songId, token) => {
  return await fetch(`${BE_URL}/jams`, {
    method: "POST",
    body: JSON.stringify({ songId }),
    headers: {
      "Content-Type": "application/json",
      ...authReqHeader(token).headers,
    },
  });
};

const startJam = async (jamId, token) => {
  return await fetch(`${BE_URL}/jams/${jamId}/start`, {
    method: "POST",
    ...authReqHeader(token),
  });
};

const joinJam = async (jamId, token) => {
  return await fetch(`${BE_URL}/jams/${jamId}`, {
    method: "PUT",
    ...authReqHeader(token),
  });
};

export { getJams, createJam, joinJam, startJam };
