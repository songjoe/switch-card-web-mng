/*
 * @Author: SongYijie
 * @Date: 2020-06-12 16:45:13
 * @LastEditors: SongYijie
 */ 
import faker from 'faker'

const getUser = () => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  createDate: faker.date.past().getTime(),
  idNum: faker.random.word(18),
  idCardType: faker.random.number({min: 1, max: 7}),
  fanCount: faker.random.number({min: 1, max: 100}),
  attentionCount: faker.random.number({min: 1, max: 100}),
  leaseCount: faker.random.number({min: 1, max: 100}),
  rentCount: faker.random.number({min: 1, max: 100}),
  likeCount: faker.random.number({min: 1, max: 100})
});

export const getUserPageList = pageSize =>
  new Array(pageSize).fill().map(() => getUser());