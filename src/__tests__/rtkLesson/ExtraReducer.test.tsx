import reducer, {
  fetchDummy,
} from "../../stores/slices/rtkLesson/custiomCounterSlice";

describe("extraReducers", () => {
  const initialState = {
    mode: 0,
    value: 0,
  };
  it("should output 100 + payload when fulfiled", () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it("should output 100 - payload when rejected", () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(95);
  });
});
