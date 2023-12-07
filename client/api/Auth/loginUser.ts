interface authData {
  role: string;
  email: string;
  password: string;
}

const loginUser = async (formData: authData): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/auth/${formData.role}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    if (!response.ok) {
      throw "Invalid email or password";
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error (e.g., log error, show error message, etc.)
    console.error("Error occurred during login:", error);
    throw error;
  }
};

export default loginUser;
