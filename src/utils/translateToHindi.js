export const translateToHindi = async (text) => {
  const apiKey = process.env.REACT_APP_TRANSLATE_API_KEY; // Replace with your API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "hi",
        format: "text",
      }),
    });

    const data = await response.json();
    return data?.data?.translations?.[0]?.translatedText || "";
  } catch (error) {
    console.error("Translation API error:", error);
    return "";
  }
};
