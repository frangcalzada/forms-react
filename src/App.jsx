import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const checkIfUsernameExists = async (username) => {
    // Simulate an API call
    const existingUsernames = ["walac", "john", "francis"];
    return existingUsernames.includes(username) ? "Username already exists" : true;
  }

  return (
    <div>
      <h1>Forms in React</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            {...register("name", {
              validate: {
                notAdmin: (fieldValue) => fieldValue !== "admin" || "Nice try!",
                notStrider: (fieldValue) =>
                  fieldValue !== "strider" || "We don't like striders",
                isNotNumber: (fieldValue) =>
                  isNaN(fieldValue) || "No numbers allowed",
                checkUsername: async (fieldValue) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  const exist = await checkIfUsernameExists(fieldValue);
                  return exist;
                }
              },
            })}
            required
            minLength={3}
          />
        </label>
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <label>
          Email:
          <input
            type="email"
            {...register("email")}
            required
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            {...register("password", { minLength: 6 })}
            required
          />
        </label>
        {errors.password && (
          <p style={{ color: "red" }}>
            Password should be at least 6 characters
          </p>
        )}

        <label>
          Confirm Password:
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Submit</button>
        <button type="reset" onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default App;
