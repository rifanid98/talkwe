export const getDataById = (datas, filterBy, id) => {
  const index = datas.map(data => data[filterBy]).indexOf(id);
  return datas[index];
}