import { PROFILE_IMAGE, FILE } from "./urls";

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
