import { parseNumericFilters } from "../utils/ParseNumericFilters.js";

function parseQuery(req, res, next) {
  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    fields,
    numericFilters,
    search,
    ...filter
  } = req.query;

  filter.pageNum = parseInt(page, 10) || 1;
  filter.limitNum = parseInt(limit, 10) || 10;
  filter.skip = (filter.pageNum - 1) * filter.limitNum;

  if (search) {
    const [key, value] = search.split(":");
    filter[key] = new RegExp(value, "i");
  }

  if (numericFilters) {
    Object.assign(filter, parseNumericFilters(numericFilters));
  }

  filter.sort = sort?.split(",").join(" ") || "createdAt";
  filter.fields = fields?.split(",").join(" ");

  req.queryFilter = filter;
  next();
}

export { parseQuery };
