# Abstract-Queue

Queues are one of the basic data structures in Software Engineering.
They come in handy for many different use cases, e.g. Job Queuing where
a Queue would manage a Collection of Jobs which need to be processed
in a sequential order. Other use cases could be Flash Messagers for web
pages or multi-tier collection synchronizers which subsequently send locally
updated items to remote tiers.

This package is abstract and can be used as core data structure of the afore-
mentioned use cases. It aims for correctness, performance and reusability.

## Usage
    npm i --save abstract-queue
    const AbstractQueue = require('abstract-queue');

    class MyQueue extends AbstractQueue {
        //@TODO: Add basic usage
        ...
    }


## More examples
// @TODO: Add more examples
- bulk set and get
- filter w/ simple obj
- filter w/ $lt/$gt operator

## Testing
Run `npm test`.

## Performance
Run `npm run perf`.

## Author
https://nicolasforgerit.com/projects/fifo-queue

Nicolas Forgerit <hello@nicolasforgerit.com>
