/*
 * @Author: SongYijie
 * @Date: 2020-06-29 09:37:21
 * @LastEditors: SongYijie
 */

import faker from "faker";

const goodsStatus = [10, 20, 21, 22, 23, 30, 31, 32, 33, 34];

const getGoods = () => ({
  id: faker.random.uuid(),
  userId: faker.random.uuid(),
  userName: faker.name.findName(),
  createDate: faker.date.past().getTime(),
  name: faker.random.words(6),
  showImage: new Array(faker.random.number({ min: 1, max: 10 }))
    .fill()
    .map(() => faker.image.image()),
  description: faker.random.words(18),
  linkCount: faker.random.number({ min: 1, max: 100 }),
  state: goodsStatus[faker.random.number({ min: 0, max: 9 })],
  remarks: faker.random.words(6),
  commentCount: faker.random.number({ min: 1, max: 100 }),
  buyerId: faker.random.uuid(),
  buyerName: faker.name.findName(),
  updateDate: faker.date.past().getTime(),
  originalPrice: faker.random.number({ min: 1, max: 10000, precision: 2 }),
  discountPrice: faker.random.number({ min: 1, max: 10000, precision: 2 }),
  finalPrice: faker.random.number({ min: 1, max: 10000, precision: 2 }),
  mailNo: faker.random.uuid(),
  mailName: faker.name.findName()
});

export const getGoodsPageList = (pageSize) =>
  new Array(pageSize).fill().map(() => getGoods());

const getGoodsComments = () => ({
  id: faker.random.uuid(),
  goodsId: faker.random.uuid(),
  toCommentId: null,
  toUserId: null,
  toUserName: null,
  author: faker.name.findName(),
  avatar: faker.image.image(),
  content: faker.random.words(6),
  createDate: faker.date.past().getTime(),
  likeCount: faker.random.number({ min: 1, max: 100 }),
  isPraise: faker.random.boolean(),
  isOwner: faker.random.boolean(),
  remarks: faker.random.words(6),
  state: faker.random.number({ min: 1, max: 3 }),
  comment: [
    {
      id: faker.random.uuid(),
      goodsId: faker.random.uuid(),
      toCommentId: faker.random.uuid(),
      toUserId: faker.name.findName(),
      toUserName: faker.name.findName(),
      author: faker.name.findName(),
      avatar: faker.image.image(),
      content: faker.random.words(6),
      createDate: faker.date.past().getTime(),
      likeCount: faker.random.number({ min: 1, max: 100 }),
      isPraise: faker.random.boolean(),
      isOwner: faker.random.boolean(),
      remarks: faker.random.words(6),
    },
  ],
});

export const getGoodsCommentsPageList = (pageSize) =>
  new Array(pageSize).fill().map(() => getGoodsComments());

// https://market.aliyun.com/products/57126001/cmapi010996.html?spm=5176.11065268.1996646101.searchclickresult.52926360ZOExVi#sku=yuncode499600008
export const getGoodsLogistics = () => ({
  update: 1588141785719, //数据最后查询的时间
  upgrade_info: "", //提示信息，用于提醒用户可能出现的情况
  updateStr: "2020-04-29 14:29:45", //数据最后更新的时间
  logo: "http://app2.showapi.com/img/expImg/zto.jpg", //快递公司logo
  dataSize: 11, //数据节点的长度
  status: 4, //-1 待查询 0 查询异常 1 暂无记录 2 在途中 3 派送中 4 已签收 5 用户拒签 6 疑难件 7 无效单 8 超时单 9 签收失败 10 退回
  fee_num: 1,
  tel: "95311", //快递公司电话
  data: [
    {
      time: "2019-11-16 21:33:56",
      context:
        "快件已在 【九江城西港】 签收, 签收人: 速递易, 如有疑问请电联:（15779254414）, 投诉电话:（13687028760）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】",
    },
    {
      time: "2019-11-16 07:31:24",
      context:
        "【九江城西港】 的程继业（15779254414） 正在第1次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）",
    },
    {
      time: "2019-11-16 07:31:23",
      context: "快件已经到达 【九江城西港】",
    },
    {
      time: "2019-11-15 19:06:30",
      context: "快件离开 【九江】 已发往 【九江城西港】",
    },
    {
      time: "2019-11-15 19:06:18",
      context: "快件已经到达 【九江】",
    },
    {
      time: "2019-11-15 10:45:21",
      context: "快件离开 【南昌中转部】 已发往 【九江】",
    },
    {
      time: "2019-11-15 08:02:44",
      context: "快件已经到达 【南昌中转部】",
    },
    {
      time: "2019-11-13 15:19:48",
      context: "快件离开 【石家庄】 已发往 【南昌中转部】",
    },
    {
      time: "2019-11-13 14:22:09",
      context: "快件已经到达 【石家庄】",
    },
    {
      time: "2019-11-13 14:08:31",
      context: "快件离开 【石家庄市场部】 已发往 【石家庄】",
    },
    {
      time: "2019-11-13 10:27:33",
      context:
        "【石家庄市场部】（0311-68026565、0311-68026566） 的 付保文四组（031186891089） 已揽收",
    },
  ],
  expSpellName: "zhongtong", //快递字母简称
  msg: "查询成功", //返回提示信息
  mailNo: "75312165465979", //快递单号
  queryTimes: 1, //无走件记录时被查询次数     注意：超过8次将会计费,即第9次开始计费
  ret_code: 0, //接口调用是否成功,0为成功,其他为失败
  flag: true, //物流信息是否获取成功
  expTextName: "中通快递", //快递简称
  possibleExpList: [],
});
