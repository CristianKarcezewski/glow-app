import { VIACEP } from "./urls";

export const findViacepLocation = async (postalCode) => {
  try {
    let response = await fetch(`${VIACEP}/${postalCode}/json`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};
