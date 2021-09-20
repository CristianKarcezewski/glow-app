import { STATES_API, CITIES_API, VIACEP } from "./urls";

export const findViacepLocation = async (
  platform,
  authorization,
  postalCode
) => {
  try {
    let response = await fetch(`${VIACEP}/${postalCode}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const loadStates = async (platform) => {
  try {
    let response = await fetch(STATES_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
      },
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const loadCities = async (platform, stateUf) => {
  try {
    let response = await fetch(`${CITIES_API}/${stateUf}/cities`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
      },
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};
