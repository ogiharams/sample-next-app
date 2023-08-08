import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "../../pages/rtlLesson/RenderInput";

afterEach(() => cleanup());

describe("Rebdering", () => {
  it("Should render all the elements correctoly", () => {
    render(<RenderInput outputConsole={undefined} />);
    expect(screen.getByRole("button")).toBeTruthy();
    // placeholderの内容で特定
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<RenderInput outputConsole={undefined} />);
    const inputValue = screen.getByPlaceholderText("Enter") as HTMLInputElement;
    // ユーザーが入力フォームに"test"と入力する動作をテスト
    userEvent.type(inputValue, "test");
    // console.log(inputValue);
    // 入力フォームの値が"test"になっているかをチェック
    expect(inputValue.value).toBe("test");
  });
});

// describe("Console button conditionally triggerd", () => {
//   // 関数が渡されていない場合
//   it("Sould not trigger output function", () => {
//     // モック関数を定義
//     const outputConsole = jest.fn();
//     render(<RenderInput outputConsole={outputConsole} />);
//     userEvent.click(screen.getByRole("button"));
//     expect(outputConsole).not.toHaveBeenCalled();
//   });

//   // 関数が渡されている場合
//   it("Should trigger output function", () => {
//     const outputConsole = jest.fn();
//     render(<RenderInput outputConsole={outputConsole} />);
//     const inputValue = screen.getByPlaceholderText("Enter");
//     userEvent.type(inputValue, "test");
//     userEvent.click(screen.getByRole("button"));
//     expect(outputConsole).toHaveBeenCalledTimes(1);
//   });
// });
