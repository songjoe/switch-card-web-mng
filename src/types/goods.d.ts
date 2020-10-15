/*
 * @Author: SongYijie
 * @Date: 2020-06-16 13:41:38
 * @LastEditors: SongYijie
 */ 
export interface IGoods {
  id: string;
  userId: string;
  userName: string;
  createDate: string;
  name: string;
  showImage: Array[string];
  description: string;
  linkCount: number;
  commentCount: number;
  state: 10 /* 待出售 */ | 20 /* 出售中 */ | 21 /* 重新出售中 */ | 22 /* 用户下架 */ | 23 /* 系统下架 */ | 30 /* 待支付 */ | 31 /* 已支付 */ | 32 /* `已发货 */ | 33 /* 待评价 */ | 34 /* 出售完成 */
  remarks: string;
  buyerId: string;
  buyerName: string;
  updateDate: string;
  originalPrice: number;
  discountPrice: number;
  finalPrice: number;
  mailNo: string;
  mailName: string;
}

export interface IGoodsComment {
  id: tring;
  goodsId: tring;
  toCommentId: string | null;
  toUserId: string | null;
  toUserName: string | null;
  content: string;
  createDate: string;
  likeCount: number;
  isPraise: boolean;
  isOwner: boolean;
  author: string;
  avatar: string;
  remarks?: string;
  state: 1 /* 未审核 */ | 2 /* 审核通过 */ | 3 /* 审核不通过 */ ;
  comment?: Array[IGoodsComment];
}

export interface IGoodsBaseProps {
  baseInfo: IGoods;
}

export interface IGoodsCommentsProps {
  baseId: string;
  onGetComment: any;
  commentCount: number;
  isLoading: boolean;
  onCheckComment: any;
}

export interface IGoodsLogisticsProps {
  baseId: string;
  mailNo: string;
  mailName: string;
  onGetLogistics: any;
  isLoading: boolean;
}

export interface ICloseOrderProps {
  baseId: string;
  visible: boolean;
  onCancel: () => void;
  baseName: string;
  onCloseOrder: any;
  isLoading: boolean;
}

export interface ICheckCommentProps {
  baseId: string;
  visible: boolean;
  onCancel: () => void;
  content: string;
  onCheckComment: any;
  isLoading: boolean;
  onCheckCallback: any
}