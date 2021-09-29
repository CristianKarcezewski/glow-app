import { PROVIDER_REGISTER } from "./urls";

export const registerProvider = async (platform, authorization, provider) => {
  try {
    let response = await fetch(PROVIDER_REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify(provider),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};
