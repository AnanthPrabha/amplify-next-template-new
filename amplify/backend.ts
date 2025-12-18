// amplify/backend.ts
import { defineBackend } from "@aws-amplify/backend";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
});

// Create a stack for custom resources
const customBucketStack = backend.createStack("custom-bucket-stack");

// Import the existing bucket using its name and region
const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
  bucketArn: "arn:aws:s3:::neu-test-browser",
  region: "us-east-1"
});

// Add the bucket to the Amplify configuration output
backend.addOutput({
  storage: {
    aws_region: "us-east-1",
    bucket_name: "neu-test-browser",
    buckets: [
      {
        aws_region: "us-east-1",
        bucket_name: "neu-test-browser",
        name: "my-external-bucket", // Identifier for your code
        paths: {
          "public/*": {
            authenticated: ["get", "list", "write", "delete"],
            guest: ["get"]
          }
        }
      }
    ]
  },
});

