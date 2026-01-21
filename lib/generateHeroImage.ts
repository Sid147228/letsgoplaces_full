export async function generateHeroImage(prompt: string) {
  try {
    const res = await fetch(process.env.AZURE_OPENAI_IMAGE_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        prompt,
        size: "1600x900",
      }),
    });

    const data = await res.json();
    return data.url; // URL of generated image
  } catch (err) {
    console.error("AI image generation failed:", err);
    return null;
  }
}
