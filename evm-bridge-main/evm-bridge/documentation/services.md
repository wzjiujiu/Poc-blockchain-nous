# Services

Services are Singleton classes encapsulating reusable code. They are used by the controllers to perform complex tasks, like file storage, sending mails or making requests to third party services without adding the logic inside the controller class.

The are placed in the [src/services](../src/services/) folder.

## Example service

Here is an example service you can use as template:

```ts
// Example service

"use strict";

export class ExampleService {
    /* Singleton */

    public static instance: ExampleService = null;

    public static getInstance(): ExampleService {
        if (ExampleService.instance) {
            return ExampleService.instance;
        } else {
            ExampleService.instance = new ExampleService();
            return ExampleService.instance;
        }
    }

    constructor() {
        // Initialization logic here
    }

    // ...
}
```

Note: When adding new services, remember to update this document.

## Existing services

Here is a list of existing services with a brief explanation on their function and usage.

### Blockchain events scan service

Location: [src/services/blockchain-events-scan.ts](../src/services/blockchain-events-scan.ts).

The blockchain events scan service is used to scan the blockchain in order to find events, and index them in the database for easier access for the controllers.

Inside the `scan` method, you must add asynchronous calls to methods that scan the events of all the smart contracts you need, here is an example:

```ts
// ...
export class BlockchainEventsScanner {
    // ...
    private async scan() {
        // ...
        // Add scanning methods below this line
        await this.scanEventsExampleContract(rangeStart, rangeEnd);

        this.currentBlock = rangeEnd;
        // ...
    }

    private async scanEventsExampleContract(fromBlock: bigint, toBlock: bigint) {
        const events = await BlockchainConfig.getExampleSmartContract().findEvents(fromBlock, toBlock);

        this.logEvents(events.events);

        for (let i = 0; i < events.length(); i++) {
            const eventType = events.getEventType(i);
            switch (eventType) {
                case "ExampleEvent":
                    {
                        const ev = events.getExampleEvent(i);
                        const timestamp = await this.getBlockTimestamp(ev.event.log.blockNumber);
                        // Handle event. Eg: Store in database
                        // ...
                    }
                    break;
            }
        }
    }
}
```

### Blockchain service

Location: [src/services/blockchain-service.ts](../src/services/blockchain-service.ts).

The Blockchain service is used to encapsulate interaction logic with the blockchain, for example:

 - Handle wallets
 - Make transaction options
 - Obtains smart contract wrappers

For smart contract wrappers, bytecodes or other smart contract tools, use the [src/contracts](../src/contracts/) folder.

### File storage service

Location: [src/services/file-storage.ts](../src/services/file-storage.ts).

The file storage service is used to store files and retrieve them later to be server for the users.

Some relevant methods are:

 - `getRandomKey`: Generates a fully random key to store a file. You can specify its privacy (public or private) and its extension.
 - `uploadFile`: Stores an upload file into a key. This is very useful for user-uploaded content. You store the file using this method, and store the key in the database.
 - `getStaticFileURL`: For a file key, gets an URL to retrieve it. If it's private, it will include an authentication token in the query.
 - `deleteFile`: Deletes a file stored in a key.

### Tasks service

Location: [src/services/task-service.ts](../src/services/task-service.ts).

The tasks service is used to perform periodic tasks.

This can be done outside the backend, but for ease, they can also be run in this service.

In order to create a new task, define an async method inside the service class, and create a task interval inside the `start` method:

```ts
this.createTask(
    "example", // Name of the task (unique)
    24 * 60 * 60 * 1000, // Interval time (milliseconds)
    this.exampleTask.bind(this),  // The method to call
    true // True if the task should run at startup, false to wait the first interval time
);
```
