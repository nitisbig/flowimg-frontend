import { Storage } from '@google-cloud/storage';

const encodedKey = process.env.GCP_CREDENTIALS_BASE64;

if (!encodedKey) {
  throw new Error('GCP_CREDENTIALS_BASE64 environment variable is missing');
}

const credentials = JSON.parse(Buffer.from(encodedKey, 'base64').toString('utf-8'));

const storage = new Storage({
    projectId: credentials.project_id, 
    credentials: credentials
});

const bucketName = 'first_bucket_king';

export async function getImages() {
  try {
    const [files] = await storage.bucket(bucketName).getFiles({prefix: 'images/'});

    const imageUrls = await Promise.all(
      files.map(async (file) => {
        // Filter out the folder itself if it's returned as a file
        if (file.name.endsWith('/')) return null; 

        const [signedUrl] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60, // 1 hour
        });

        return {
          name: file.name,
          url: signedUrl,
        };
      })
    );

    // Remove any null entries (from the folder filter above)
    return imageUrls.filter(img => img !== null);

  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}