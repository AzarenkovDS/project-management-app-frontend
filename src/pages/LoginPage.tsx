import { useState } from "react";
import { useUser } from "../context/UserContext";
import type { ValidationError } from "../types";

function LoginPage() {
  const [errors, setErrors] = useState<ValidationError>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { login } = useUser();

  const validate = () => {
    const newErrors: ValidationError = {};
    if (!formData.email.trim())
      newErrors["email"] = { message: "Path `email` is required." };
    if (!formData.password)
      newErrors["password"] = { message: "Path `password` is required." };
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(formData);
    } catch (error: any) {
      // Check if error has expected shape
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error?.status === 400) {
        setErrors({
          email: { message: "Invalid email or password." },
          password: { message: "Invalid email or password." },
        });
      } else {
        // Other errors
        setErrors({
          general: { message: "Login failed. Please try again." },
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3 text-center">Login</h1>

      <div className="row justify-content-md-center">
        <div className=" col-md-6">
          <form onSubmit={handleSubmit} noValidate>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
