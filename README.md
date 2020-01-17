### The code uses Node version 12.14.0 and only one npm module underscore.
Allocates requests to butlers.

# Duration: 40 minutes


Allocates requests to butlers.
Each individual client should be allocated to one butler as much as possible.
Each butler has a maximum of 8 working hours.


Note:
Timebox it!
Please use version control, preferably git.
Add your approach to testing.
Ensure the batch can handle files of varying sizes without having to scale vertically.


# Language:
node.js (plus any library or frameworks that you are comfortable with)

# Schema:

const exampleRequests = [
    {
        clientId: 1,
        requestId: 'abc',
        hours: 6
    },
    {
        clientId: 2,
        requestId: 'ghi',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'def',
        hours: 4
    },
    {
        clientId: 1,
        requestId: 'zzz',
        hours: 2
    }
]

const exampleReturnValue = {
    butlers: [
        {
            requests: ['abc', 'zzz']
        },
        {
            requests: ['def','ghi']
        }, 
        {
            etc: 'etc...'
        }
    ],
    spreadClientIds: [1,2]
}

function allocateAndReport(requests) {
    // Code here
}
