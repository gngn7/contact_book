import { themeContext, ThemeContextProvider } from "./ThemeContext";
import { useRead, useWrite } from "./useFetch";
import "./App.css";
import { useContext } from "react";

const ThemedButton = () => {
  const theme = useContext(themeContext);

  return <button style={{ backgroundColor: theme.primary }}>Submit</button>;
};

type Contact = {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
};

type FormData = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
};

function App() {
  const url = "http://localhost:3001/contacts";
  const getContacts = useRead<Contact[]>(url);
  const createContact = useWrite<FormData, Contact>(url);

  return (
    <ThemeContextProvider>
      <div className="App">
        <a href="/contacts/new">Add new contact</a>
        {getContacts.data?.map((contact) => (
          <div key={contact.id}>
            {contact.firstname} {contact.lastname}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createContact.write({
              firstname: "John",
              lastname: "Doe",
              address: "123 Main St",
              phone: "555-555-5555",
              email: "",
              birthday: "",
            });
          }}
        >
          <input type="date" />
          <button type="submit" disabled={createContact.status === "loading"}>
            Submit
          </button>
          <ThemedButton />
        </form>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
