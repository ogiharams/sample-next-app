import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { server } from "../mock/server";
import { render, screen, waitFor, act } from "@testing-library/react";
import SelectBox from "../../../pages/rtlLesson/SelectBox";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockData1 = [
  {
    body: "body1",
    email: "email1",
    id: 1,
    name: "name1",
    postId: 1,
  },
  // Add other data as needed
];

const mockData2 = [
  {
    body: "body2",
    email: "email2",
    id: 2,
    name: "name2",
    postId: 2,
  },
  // Add other data as needed
];

describe("SelectBox Component", () => {
  it("SelectBox 1 renders with data", async () => {
    // Mock the API request for the first SelectBox
    server.use(
      rest.post("/api/jsonplaceholderUser/", (req, res, ctx) => {
        return res(ctx.json(mockData1));
      })
    );

    render(<SelectBox />);

    // Wait for the component to render and the API call to complete
    await waitFor(() => {
      // Find the Select component for the first SelectBox using data-testid
      const selectBox1 = screen.getAllByLabelText("Age")[0]; // Use the second SelectBox

      // Open the SelectBox
      userEvent.click(selectBox1);

      // Check if the option is in the document (replace with your actual data)
      const emailOption = screen.getByText("email1");
      expect(emailOption).toBeInTheDocument();
    });
  });

  it("SelectBox 2 renders with data", async () => {
    // Mock the API request for the second SelectBox
    server.use(
      rest.post("/api/jsonplaceholderUser/", (req, res, ctx) => {
        return res(ctx.json(mockData2));
      })
    );

    render(<SelectBox />);

    // Wait for the component to render and the API call to complete
    await waitFor(() => {
      // Find the Select component for the second SelectBox
      const selectBox2 = screen.getAllByLabelText("Age")[1]; // Use the second SelectBox

      // Open the SelectBox
      userEvent.click(selectBox2);

      // Check if the option is in the document (replace with your actual data)
      const emailOption = screen.getByText("email2");
      expect(emailOption).toBeInTheDocument();
    });
  });
});
