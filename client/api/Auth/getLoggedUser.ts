import { cookies } from "next/headers";

const getLoggedUser = async () => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/auth/verifyToken`, {
      method: "GET",
      credentials: "include", // Send cookies with the request
      headers: {
        Cookie: `token_uid=${cookies().get("token_uid")?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    // Process the data retrieved from the response
    console.log(data.data);
    return data.data;
  } catch (error) {
    // Handle errors
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export default getLoggedUser;
