const Login = () => {
  return (
    <>
      <form>
        <fieldset>
          <legend>Login</legend>
          <p>
            <label for="email_input">Email</label>
            <input
              className="border border-opacity-100"
              type="text"
              name="email"
              id="email_input"
              placeholder="E-mail"
            />
          </p>
          <p>
            <label for="size_2">Password</label>
            <input
              className="border border-opacity-100"
              type="password"
              name="password"
              id="password_input"
              placeholder="password"
            />
          </p>
        </fieldset>
      </form>
      <button type="submit" value="submit">
        Login
      </button>
    </>
  );
};

export default Login;
