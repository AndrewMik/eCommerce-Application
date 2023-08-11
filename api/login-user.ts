import Client from './client';

function loginUser(email: string, password: string) {
  const client = new Client().getPasswordFlowClient(email, password);
  const body = {
    email,
    password,
  };

  const loggedInUser = client
    .login()
    .post({
      body,
    })
    .execute()
    .catch((err: Error) => err);

  return loggedInUser;
}

export default loginUser;
