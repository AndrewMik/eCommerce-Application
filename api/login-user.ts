import Client from './client';

type ErrorDescriptiob = {
  code: string;
  message: string;
};

export interface ErrorBodyResponse {
  statusCode: number;
  message: string;
  error: string;
  error_description: string;
  errors: ErrorDescriptiob[];
}

export interface CustomErrorResponse {
  body: ErrorBodyResponse;
}

async function loginUser(email: string, password: string) {
  const client = new Client().getPasswordFlowClient(email, password);
  const body = {
    email,
    password,
  };

  try {
    const response = await client.login().post({ body }).execute();
    return response.statusCode;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as CustomErrorResponse;
    return errorResponse.body.statusCode;
  }
}

export default loginUser;
