import { setupServer } from "msw/node";
import { SelectBoxInfoApiMockHandler } from "../mock/SelectBoxInfoApiMock";

export const server = setupServer(...SelectBoxInfoApiMockHandler);
