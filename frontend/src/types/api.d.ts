interface doLoginRequest {
  email: string;
  password: string;
}

interface doSignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface filterTodosRequest {
  sort_order: string;
  category: string;
  status: string;
  sentiment: string;
}

interface createTodosRequest {
  name: string;
  description: string;
  deadline: Date;
  category: string;
  status: string;
  color: string;
}
