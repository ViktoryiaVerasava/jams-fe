const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const signIn = async ({ email, password }) => {
  console.log(email);
  const signInRespose = await fetch(`${BE_URL}/users1/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await signInRespose.json();
  return data;
};

export { signIn };
