# Hotel California

## Requirements

- Disable all functionalities that require a button press. (e.g., Just remove the buttons)
- Create the following React components: displayHomepage, addCustomer, deleteCustomer, displayCustomers, displayFreeSlots. You can create more components if you need. For example, you may want a dummy top level component that contains the aforementioned components. You may also want a component for building the table. (refer Chapter 3 of textbook)
- Unconditionally display all the components all the time (i.e., no button press).
- Use hard-coded customer information. This means your addCustomer and deleteCustomer logic will not work yet. Also, the number of free slots will remain constant. You will code the rest of the logic in Tutorial 4.
- Testing: You need at least 2-3 customer details (which you hard coded) to be displayed on the web application. There is nothing else to check at this point. But remember, “Rome wasn’t built in a day.” We will test the rest of the functionality in Tutorial 4.

## To get started

To run this locally 💻

```bash
npm install
npm run deploy
```

To run with Docker 🐳 (if you have it on your machine)

```bash
docker build . -t hotel-cali-tutorial-3
docker run -p 8000:8000 hotel-cali-tutorial-3
```
