// amplify/backend.ts
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
});

// Link your existing bucket: neu-test-browser-new
backend.addOutput({
  storage: {
    aws_region: "us-east-1",
    bucket_name: "neu-test-browser",
    buckets: [
      {
        name: "test-browser-bucket", // Friendly name for your frontend code
        bucket_name: "neu-test-browser",
        aws_region: "us-east-1",
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

