import axios from "axios";

interface TokenResponse {
  token: string;
  region?: string;
}

export const getToken = async (): Promise<TokenResponse> => {
  const speechKey = process.env.NEXT_PUBLIC_SPEECH_KEY;
  const speechRegion = process.env.NEXT_PUBLIC_SPEECH_REGION;
  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    return { token: tokenResponse.data, region: speechRegion };
  } catch (err) {
    throw new Error("Failed to retrieve token");
  }
};
