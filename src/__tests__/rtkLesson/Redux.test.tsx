import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { AnyAction, Store, configureStore } from "@reduxjs/toolkit";
import custiomCounterReducer from "../../stores/slices/rtkLesson/custiomCounterSlice";
import Redux from "../../pages/rtlLesson/Redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Redux Integration Test", () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: custiomCounterReducer,
      },
    });
  });
  it("Should display value with increment by 1 per click", () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    // screen.debug(screen.getByTestId("count-value"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });

  it("Should display value with decrement by 1 per click", () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.click(screen.getByText("-"));
    userEvent.click(screen.getByText("-"));

    expect(screen.getByTestId("count-value")).toHaveTextContent("-2");
  });

  it("Should display value with incrementByAmount ", () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.type(screen.getByPlaceholderText("Enter"), "30");
    userEvent.click(screen.getByText("IncrementByAmount"));

    expect(screen.getByTestId("count-value")).toHaveTextContent("30");
  });
});
