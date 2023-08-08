import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "../../pages/rtlLesson/Render";

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    // htmlの構造を取得
    render(<Render />);
    // screen.debug();
    // https://github.com/A11yance/aria-query#elements-to-roles
    // screen.debug(screen.getByRole("heading"));

    // https://jestjs.io/docs/en/expect
    // 要素が存在するかのテスト
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();

    // textの内容が存在するかのテスト
    // screen.debug(screen.getByText("Udemy"));
    // 指定したテキストが存在することをテスト
    expect(screen.getByText("Udemy")).toBeTruthy();
    // 指定したテキストが存在しないことをテスト
    expect(screen.queryByText("Udemyyyy")).toBeNull();

    // 指定したidが存在することをテスト
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});
