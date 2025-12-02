import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

// Initialize storage with environment variables
const storage = new Storage({
    keyFilename: 'bucket_key.json'
});

const bucketName = 'first_bucket_king';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a unique filename
    const filename = `images/generated-${Date.now()}.png`;
    const bucket = storage.bucket(bucketName);
    const gcsFile = bucket.file(filename);

    // Upload the file
    await gcsFile.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    return NextResponse.json({ 
      success: true, 
      filename: filename,
      // If bucket is public, you can return the public URL:
      // url: `https://storage.googleapis.com/${bucketName}/${filename}` 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}