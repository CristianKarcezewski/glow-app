import {
  PROFILE_IMAGE,
  UPLOAD_COMPANY_FILE,
  GET_ALL_COMPANY_IMAGES,
  REMOVE_COMPANY_IMAGE,
} from "./urls";

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

export const setCompanyImage = async (
  platform,
  authorization,
  companyId,
  url
) => {
  try {
    let response = await fetch(`${UPLOAD_COMPANY_FILE}/${companyId}`, {
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

export const loadCompanyImages = async (platform, companyId) => {
  try {
    let response = await fetch(`${GET_ALL_COMPANY_IMAGES}/${companyId}`, {
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
