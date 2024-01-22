import { render } from "@testing-library/react";
import { FormProvider } from "./context/context";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
const queryClient = new QueryClient();

const AllTheProviders = ({ children }) => {
  return (
    <FormProvider>
      <QueryClientProvider client={queryClient}>
        <Router>{children}</Router>
      </QueryClientProvider>
    </FormProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
