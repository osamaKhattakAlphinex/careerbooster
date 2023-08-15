// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../store/counterSlice";
// import { RootState } from "../store/store";

function Counter() {
  //   const count = useSelector((state: RootState) => state.counter.value);
  //   const dispatch = useDispatch();

  return (
    <div>
      <p>Count: </p>
      {/* {count} */}
      {/* <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button> */}
    </div>
  );
}

export default Counter;
