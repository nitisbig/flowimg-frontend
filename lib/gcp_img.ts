


import { Storage } from '@google-cloud/storage';

// Initialize storage
const storage = new Storage({
    keyFilename: "bucket_key.json"
});

const bucketName = 'first_bucket_king';

export async function getImages() {
  try {
    // 1. Get files from the bucket
    const [files] = await storage.bucket(bucketName).getFiles({prefix: 'images/'});

    // 2. Generate URLs for each file
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        // OPTION A: If bucket is PRIVATE, generate Signed URL (valid for 1 hour)
        const [signedUrl] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60, // 1 hour
        });

        // OPTION B: If bucket is PUBLIC, use the public link directly:
        // const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

        return {
          name: file.name,
          url: signedUrl, // Switch to publicUrl if using Option B
        };
      })
    );

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}