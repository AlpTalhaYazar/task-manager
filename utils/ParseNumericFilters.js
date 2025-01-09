const parseNumericFilters = (numericFilters) => {
  const operatorMap = {
    ">": "$gt",
    "<": "$lt",
    ">=": "$gte",
    "<=": "$lte",
  };
  const filters = {};

  numericFilters.split(",").forEach((item) => {
    const [field, operator, value] = item.split(/(>=|<=|>|<)/);
    // optional: validate field
    // optional: validate operator
    filters[field] = {
      [operatorMap[operator]]: Number(value),
    };
  });

  return filters;
};

export { parseNumericFilters };
