import { screen } from "@testing-library/react";
import HomePage from "../src/pages/home";
import { render } from "../src/test-utils";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

describe("HomePage", () => {
  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const navbarText = screen.getByRole("heading", { name: "فرم ساز" });

    expect(navbarText).toBeInTheDocument();

    const filterBtn = screen.getByRole("button", { name: "فیلتر" });

    expect(filterBtn).toBeInTheDocument();
  });
});
