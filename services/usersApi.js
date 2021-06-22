const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const signIn = async ({ email, password }) => {
  const signInRespose = await fetch(`${BE_URL}/users/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await signInRespose?.json();
  return data;
};

const signUp = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  instrument,
}) => {
  const signUpRespose = await fetch(`${BE_URL}/users/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      phone,
      instrument,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await signUpRespose?.json();
  data.status = signUpRespose.status;
  return data;
};

export { signIn, signUp };
