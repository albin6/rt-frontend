import axios from "axios";
import { message } from "antd";

export async function onSubmitLogin(values: { email: string; password: string }, role: string) {
  try {
    const response = await axios.post("/api/users/login", {
      email: values.email,
      password: values.password,
      role: role,
    });
    console.log("Login success:", response.data);
    message.success("Login successful!");
    // You can add further logic like redirecting user here
  } catch (error: any) {
    console.error("Login error:", error.response?.data ?? error.message ?? error);
    message.error(error.response?.data?.message || "Login failed");
  }
}
