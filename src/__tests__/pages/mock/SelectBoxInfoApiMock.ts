// src/mocks/handlers.js
import { rest } from "msw";

const mockData1 = [
  {
    body: "body1",
    email: "email1",
    id: 1,
    name: "name1",
    postId: 1,
  },
  // 他のデータも追加
];

const mockData2 = [
  {
    body: "body2",
    email: "email2",
    id: 2,
    name: "name2",
    postId: 2,
  },
  // 他のデータも追加
];

export const SelectBoxInfoApiMockHandler = [
  // ここでリクエストごとのハンドラを設定します
  rest.post("/api/jsonplaceholderUser/", (req, res, ctx) => {
    // レスポンスデータを設定
    const response = {
      status: 200,
      body: mockData1, // または mockData2 など、適切なデータを選択
    };
    return res(ctx.json(response));
  }),
];
