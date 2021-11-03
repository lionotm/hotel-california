# 🏝 Hotel California 🏨

- Mobile POC of the Waitlist System

## To get started

### To run this locally 💻

```bash
npm install
npm run watch
```

Note: Make sure you have a `.env` file in `./server` if you would like to define your own port

## Requirements

- Implemented add customers to the waitlist DB through the mobile interface.
  - `./client/screens/TabOneScreen.tsx`
- Multiple Text and TextInput components to accept the input from user for adding to the waitlist DB.
  - `./client/components/AddWaitlistForm.tsx`
- Write the logic for connecting to the ApolloServer GraphQL engine that will accept your graphql queries. Note that the query/mutation schema is already defined in T5. If you are using a different schema, you are allowed to add this logic to the back-end.
  - `./client/constants/GraphQL.queries.ts` & `./client/components/AddWaitlistForm.tsx`
- Write the logic for state maintenance in ReactNative. The idea is to maintain the input values you accept from a user through TextInput as a state, so that whenever it is updated, you can make a GraphQL query to pull data from the back-end. Another point to note is that the state info always moves top down in React – use callback functions. Note that this point is just a suggestion and you can choose to implement it differently.
  - `./client` in general
