import { int } from "./alias";

type PaginationQuery = {
  from?: int;
  size?: int;
};

export default PaginationQuery;
