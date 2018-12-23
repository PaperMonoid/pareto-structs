import BiFunction from "./BiFunction";

type Comparator<T> = BiFunction<T, T, number>;

export default Comparator;
