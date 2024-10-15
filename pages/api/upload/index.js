import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not allowed" });
    return;
  }

  const form = formidable({});

  form.parse(request, async (error, fields, files) => {
    if (error) {
      response.status(500).json({ message: "File parsing failed" });
      return;
    }

    const file = files.image[0];
    const { newFilename, filepath } = file;

    try {
      const result = await cloudinary.v2.uploader.upload(filepath, {
        public_id: newFilename,
        folder: "nf",
      });
      response.status(200).json(result);
    } catch (uploadError) {
      response.status(500).json({ message: "Cloudinary upload failed" });
    }
  });
}
