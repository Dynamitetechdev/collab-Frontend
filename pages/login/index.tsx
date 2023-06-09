import AuthForm from "@/components/auth/authForm";

const Login = () => {
  return (
    <AuthForm
      name="Login "
      description="Welcome"
      method={"POST"}
      routeTo="/dashboard"
      endPoint=""
    />
  );
};

export default Login;
