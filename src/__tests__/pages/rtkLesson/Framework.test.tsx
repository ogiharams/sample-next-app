import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FrameworkList from "../../../pages/rtlLesson/FrameworkList";

afterEach(() => cleanup());

describe("Rendering the list with props", () => {
  it("Should render No data ! when no data propped", () => {
    render(<FrameworkList frameworks={""} />);
    // screen.debug();
    // console.log(screen.getByText("No data !"));
    expect(screen.getByText("No data !")).toBeInTheDocument();
  });
  it("should render list item correctly", () => {
    const dummyData = [
      { id: 1, item: "react dummy" },
      { id: 2, item: "anguler dummy" },
      { id: 3, item: "vue dummy" },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    // 画面に表示されているテキスト
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    console.log("frameworkItems", frameworkItems);
    // ダミーデータ
    const dummyItems = dummyData.map((ele) => ele.item);
    console.log("dummyItems", dummyItems);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText("No data !")).toBeNull();
  });
});
