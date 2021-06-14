const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const getJams = async (type) => {
  const jamsRespose = await fetch(`${BE_URL}/jams${type?`?${type}=true`:''}`);
  const { data } = await jamsRespose.json();
  return data;
};

export { getJams };
