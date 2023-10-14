## Sync Questions Service

This directory sets up serverless functions to sync samples questions and question of the day to PeerPrep questions service.

### Set Up
Clone the repository, and install dependencies.
```
cd ay2324s1-assignment-6-g37/microservices/sync-questions-service/functions
npm install
```

Run firebase emulator to emulate firebase cloud functions
```
npm run dev
```

### API Reference

#### Types

```
type Options = {
  questionsServiceUrl: string
};
```

#### Sync question of the day from Leetcode into PeerPrep questions service.

Optionally takes in hostname / IP address of the PeerPrep server. Defaults to 127.0.0.1.

Request: GET /peerprep-1c8b3/us-central1/syncQotd
Body [Optional]: `Options` in JSON format

#### Sync 20 sample questions from Leetcode into PeerPrep questions service.

Optionally takes in hostname / IP address of the PeerPrep server. Defaults to 127.0.0.1.

Request: GET /peerprep-1c8b3/us-central1/syncSampleQuestions
Body [Optional]: `Options` in JSON format
