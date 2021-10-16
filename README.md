# 🏝 Hotel California 🏨

## To get started

To run this locally 💻

```bash
npm install
npm run deploy
```

Note: Make sure you have a `.env` file in `./server` defined with the desired port

To run with Docker 🐳  
Please check if you have Docker installed locally

```bash
docker build . -t hotel-california
docker run -p 8000:8000 hotel-california
```

## Requirements

- Enable all button clicks that will display the corresponding React components that you designed in Tutorial 3. You must remove the button for displayCustomers and display this component all the time. [Hint: Refer Chapter 4 (Event Handling) of textbook]
  - Done
- Code the form for adding a Customer. On clicking the submit button, the internal data structure on which you store the waitlist must be updated. At the same time, the displayCustomer component should be updated dynamically. If you coded using React, this will automatically happen. [Hint: Refer Chapter 4 of textbook]
  - Done in `Add Customer` page
- Likewise, code a form for deleting a Customer. On submit, the internal datastructure must be updated and in the front end, the displayCustomer should be automatically updated.
  - Prefer to delete via buttons assigned to customer card/list as it feels more convenient and user-friendly, could do a form if it is really necessary but the backend logic remains the same
- The number of free slots should also be automatically updated when you add or delete a customer.
  - On top app bar, changes color as the queue gets busier. Max number of free slots are pulled from server to prevent client-side manipulation
- Testing: You need to add/remove customers and see if the table and free slots are updated correctly. Corner cases such as underflow and overflow must also be tested.
  - Overflow: Add customer form will throw error if user tries to add when free slots is 0.
  - Underflow: Based on design, user has no button to delete if the entry is not present.
