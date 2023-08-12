import Client from './client';

async function loginUser(email: string, password: string) {
  const client = new Client().getPasswordFlowClient(email, password);
  const body = {
    email,
    password,
  };

  try {
    await client.login().post({ body }).execute();
  } catch (error) {
    throw error;
  }
}

export default loginUser;
