import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

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

  console.log("Request received:", request);

  //   form.parse(request, async (error, files) => {
  //     if (error) {
  //       response.status(500).json({ message: "File parsing failed" });
  //       return;
  //     }

  //     console.log("Parsed files:", files);

  //     if (!files.file || files.file.length === 0) {
  //       response.status(400).json({ message: "No image file uploaded" });
  //       return;
  //     }

  //     const file = files.file[0];
  //     console.log("File detail:", file);

  //     const { filepath, originalFilename } = file;
  //     try {
  //       const result = await cloudinary.uploader.upload(filepath, {
  //         public_id: originalFilename,
  //         folder: "nf",
  //       });

  //       response.status(200).json(result);
  //     } catch (uploadError) {
  //       console.error("Cloudinary upload failed", uploadError);
  //       response.status(500).json({ message: "Cloudinary upload failed" });
  //     }
  //   });
  // }

  const [fields, files] = await form.parse(request);

  const file = files.image[0];
  const { originalFilename, filepath } = file;

  const {
    height,
    width,
    secure_url: url,
  } = await cloudinary.v2.uploader.upload(filepath, {
    public_id: originalFilename,
    folder: "nf",
  });

  response.status(201).json({
    height,
    width,
    url,
  });
}
