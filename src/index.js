import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./context/themeContext";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,

} from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const httpLink = new HttpLink({
  uri: "https://api.poc.graphql.dev.vnplatform.com/graphql",
});


const authMiddleware = new ApolloLink((operation,forward) =>{
  operation.setContext(({headers = {}}) => ({
    headers:{
      ...headers,
      authorization: `${process.env.REACT_APP_API_ACCESS_TOKEN}`
    }
  }))
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware,httpLink),
  cache: new InMemoryCache(),
  
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
