
module.exports = {
  async paginate(Model, conditions = {}, page = 1, limit = 10, populate = "", sort = 'createdAt DESC') {
    page = Number(page);
    limit = Number(limit);
    let data = Model.find({ where: conditions, limit, skip: (page > 0 ? page - 1 : 0) * limit })
    if (populate) data = data.populate(populate)
    data = data.sort(sort);
    data = await data;
    const total = await Model.count(conditions)
    return { data, meta: { page, limit, total, page_count: Math.ceil(Number(total) / Number(limit)) } };
  },
};
