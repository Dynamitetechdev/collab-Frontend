import AuthForm from "@/components/auth/authForm";

const Register = () => {
  return (
    <AuthForm
      name="Register"
      description="Welcome"
      method={"POST"}
      routeTo="/dashboard"
      endPoint="/auth/register"
      signUp={true}
    />
  );
};

export default Register;
