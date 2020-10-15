/*
 * @Author: SongYijie
 * @Date: 2020-06-16 13:41:38
 * @LastEditors: SongYijie
 */ 
export interface IUser {
  id: string;
  name: string;
  phone: string;
  createDate: string;
  idNum: string;
  idCardType: 1 /* 居民身份证 */ | 2 /* 香港居民来往内地通行证 */ | 3 /* 香港居民居住证 */ | 4 /* 台湾居民往来大陆通行证 */ | 5 /* 台湾居民居住证 */ | 6 /* 澳门居民来往内地通行证 */ | 7 /* 澳门居民居住证 */;
  leaseCount: number,
  rentCount: number,
  fanCount: number,
  attentionCount: number,
  likeCount: number
}

export interface IUserBaseProps {
  baseInfo: IUser;
}