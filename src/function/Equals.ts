import BiFunction from "./BiFunction";

type Equals<T> = BiFunction<T, T, boolean>;

export default Equals;
