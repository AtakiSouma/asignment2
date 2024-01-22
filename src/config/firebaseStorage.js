import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";
dotenv.config();

initializeApp({
  credential: cert({
    type: "service_account",
    project_id: "movie-nextflix",
    private_key_id: "e69ab8c2917440f3b7338b4dd0c94ff8b20fed51",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCS5fu+yyP12lvo\nfxqYrwk3fc5a3KA5YQ5k8YMr0KvLO/hoewtH+DjI8Q2snxRTHN0i4j957ypcb/Xw\nE+8rYcwBG4JcrRg3IXCnROOA09cbwbuAjcHuPSMSwxRPvV6N2TzNNCKf+2zhwfZW\nfGed/X0/Mqyt88oPutaho+3hJyiVdxVCtekmUhlTF1JRZXOYzsrSORTCe4EXQxhE\nHmJVrH8yGRNEvuxLJQd0lan6phztNOa8ZRBuUVcflUizPrvwyXqi+L1ugElZOpry\ngbKVNlJjmWeEItcv2ZaM00saOj8zUozWb3zJAxFT0CVYlrBwey0qGbj77tGypNqs\nnYAGwENDAgMBAAECggEAH0/hgPJJGIMyexT4xNnuk4MABPMpPgHXsSGfzaudquT+\nFrs/lNgutnpXaVfBW9P3uRNT53hY5bpByKpfHTar5wKHn5yP4FSC8EypV9EP9Y0u\nnADbeR5UBxBJGJQrfv3yzWTTCpnrxBV1nkrHRXB+jYWONEgWZpLzZCIOtyMDLhSQ\n6gKuvy6tY/9cnP7AAgLM3qcBZno7N+FN4IHrYLIOsZOE2FHVKdO22/O+jPKctSwC\nQ8tk6WLIuvb9j1ctfj7xWqSzNCJ8JfYkO4yTn5Y8XwAKyeJhwYYjnN0U+R2tz1iI\npGERKbBMT9R8SCgxmF0AldxzYr6BRsruKeDq1rgvNQKBgQDB8vjqYYujhtYZniNG\nyCatnWPJw3ahu+YbsfBCCoHAqn8Dh9IShcSBXWPtX2S9hU5J/bcvTEhjcvn1wxPl\nIa9mLQNVtWBf07ErjWddLSzimlhVANRjcqydgUVNfl9OeSrz1OL1r/sB/sLkMz5h\nn4xzwwk/T8Lan/mPAyAITaAWlwKBgQDB5WlAYH1Ukf4xhOpbyb4GSoFqYQ8Mfasc\n/hXUFZfZFMKiyS6KCtoOVrMrsWYfNLj22wkEqUZLd8K98dSjaogts+hOHbhEME7j\n7JZ6POj5O7e8FNYdPmHsGRf+r7eqM1OgECHfKoYmQVik48Rg8sTekco4LFMufk0M\nL4EHLHnaNQKBgQDBUZpipRA20zOdHU80QlSrQPIyLi6VT2Exwc8lRKvIiylHL55o\n8ATKnXf5JtiXP8SlY8uvzW1qEzSrjuLJxSW7xqpISB3j5nH2Y1/gNCNFS2s4bzdE\nWQ1NgYi+kXQWGBiEKnJ/SgX8Gx/PrnRDgnDRAlq5TJuAp2xs7ESFgjpLyQKBgQC9\n/mgmFuZ4ah4ks9NZYdP8IiGx9a1jVfjIDgmhqg8DPh6CmJQr2/pTto0WsVwaE/Vy\nnqq1kJE6/f0rVr4/6vHJptJpSSH4X0XOfVPuL6UyI1wkxl4QhcI6MVSb0d8sveKh\no20tWmPdNIcB+9XAEeLrHPyEEprnogcpe5r5RpGYSQKBgQCk64iphdonO4anlqFS\nX4Wj/YCGCHKDpFlARAE4vTjGVfeMX7I5OEU8Q6uWEGo5fHmUHph7xYHaJzMh009K\nmMJRDmg3IoueWwUNPjOEVHbRmTSa6NBZTquyRFYTp5V1Ckl/InlY6gFnz9p7oa3M\nFuL3TEUZIgmBbJx4Kz+hjY9Lyg==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-7hf1v@movie-nextflix.iam.gserviceaccount.com",
    client_id: "115300751570773975518",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7hf1v%40movie-nextflix.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage().bucket();
export default storage;
