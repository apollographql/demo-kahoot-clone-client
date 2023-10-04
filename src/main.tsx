import ReactDOM from "react-dom/client";

// import styles
import "./index.css";
import { theme } from "./utils/theme.tsx";
import { ChakraProvider } from "@chakra-ui/react";

// import page routes
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

// import Apollo Client setup
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// http link for graphql operations
const httpLink = new HttpLink({
  uri: import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://demo-kahoot-router-680fedf88eaf.herokuapp.com/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("playertoken");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      player: token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ApolloProvider>,
);
