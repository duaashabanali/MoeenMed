"use client";
import { client } from "@/lib/apollo-provider";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// AppProvider component responsible for wrapping the entire application with necessary providers and components
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    // Wrapping the application with ApolloProvider to provide Apollo client for GraphQL operations
    <ApolloProvider client={client}>
        {/* ToastContainer for displaying notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
    </ApolloProvider>
  );
}
