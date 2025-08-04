import { useState } from "react";
import { useUser } from "../context/UserContext";
import type { ValidationError } from "../types";

function RegisterPage() {
  const [errors, setErrors] = useState<ValidationError>({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { register } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("handleSubmit");

    try {
      await register(formData);
    } catch (error: any) {
      if (error?.response?.data?.code === 11000) {
        // Duplicate key error

        const [field] = Object.keys(error.response.data.keyValue);
        setErrors({
          [field]: { message: `${field} already exists` },
        });
      } else if (error?.response?.data?.errors) {
        // Check if error has expected shape

        setErrors(error.response.data.errors);
      } else {
        // Other errors

        setErrors({
          general: { message: "Registration failed. Please try again." },
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3 text-center">Register</h1>

      <div className="row justify-content-md-center">
        <div className=" col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {errors.general && (
              <>
                <div className="is-invalid" />
                <div className="invalid-feedback">{errors.general.message}</div>
              </>
            )}

            <br />

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
