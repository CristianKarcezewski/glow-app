import { STATES_API, CITIES_API } from "./urls";

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

export const loadCities = async (platform, stateId) => {
  try {
    let response = await fetch(`${CITIES_API}?stateId=${stateId}`, {
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
