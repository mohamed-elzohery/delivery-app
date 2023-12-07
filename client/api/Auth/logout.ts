const logoutUser = async (): Promise<any> => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/auth/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error occurred during logout:", error);
    throw error;
  }
};

export default logoutUser;
