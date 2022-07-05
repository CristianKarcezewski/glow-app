import { PROFILE_IMAGE, FILE } from "./urls";
import { REMOVE_COMPANY_IMAGE } from "./urls"
import { GET_COMPANY_IMAGE_ALL } from "./urls";


export const setProfileImage = async (platform, authorization, url) => {
  try {
    let response = await fetch(PROFILE_IMAGE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify({ fileUrl: url }),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const setCompanyImage = async (platform, authorization, url) => {
  try {
    let response = await fetch(PROFILE_IMAGE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        platform,
        authorization,
      },
      body: JSON.stringify({ fileUrl: url }),
    });

    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    throw error;
  }
};

export const loadCompanyImages = async (platform, authorization) => {
  try {
    let response = await fetch(GET_COMPANY_IMAGE_ALL, {
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

export const removeCompanyImage = async (
  platform,
  authorization,
  companyId
) => {
  try {
    let response = await fetch(`${REMOVE_COMPANY_IMAGE}/${companyId}`, {
      method: "DELETE",
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