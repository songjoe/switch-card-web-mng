/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:37:12
 * @LastEditors: SongYijie
 */ 
import { CALL_API } from '@/middleware/api';
import { GET_GOODS_PAGELIST, CLOSE_ORDER, GET_GOODS_COMMENTS_PAGELIST, GET_GOODS_LOGISTICS, CHECK_COMMENT } from '@/constants/actionTypes';
import Schemas from '@/constants/entities';
import { message } from 'antd';

export const getGoodsPageList = options => dispatch => (
  dispatch({
    [CALL_API]: {
      type: GET_GOODS_PAGELIST,
      schema: Schemas.GOOD_ARRAY,
      endpoint: '/goods',
      options
    }
  })
)

export const closeOrder = (payload, callback) => async (dispatch, getState) => {
  const { code } = await dispatch({
    [CALL_API]: {
      type: CLOSE_ORDER,
      endpoint: '/goods/closeOrder',
      method: 'POST',
      payload
    }
  });

  if (code === 200) {
    message.success('订单关闭成功');
    callback();
    const { filter, meta } = getState();
    const filterGoods = filter.goods;
    const metaGoods = meta.goods;
    const options = {
      ...filterGoods,
      ...metaGoods
    };
    if (metaGoods) {
      const { total, pageSize, current } = metaGoods;
      if (total) {
        let pageCurrent = Math.ceil((total - 1) / pageSize);
        pageCurrent = current > pageCurrent ? (current - 1) : current;
        pageCurrent = pageCurrent <= 0 ? 1 : pageCurrent;
        options.current = pageCurrent;
      }
    }

    dispatch(getGoodsPageList(options));
  }
}

export const getGoodsCommentsPageList = options => dispatch => (
  dispatch({
    [CALL_API]: {
      type: GET_GOODS_COMMENTS_PAGELIST,
      endpoint: '/goods/comments',
      options
    }
  })
)

export const getGoodsLogistics = options => dispatch => (
  dispatch({
    [CALL_API]: {
      type: GET_GOODS_LOGISTICS,
      endpoint: '/goods/logistics',
      options
    }
  })
)

export const checkComment = payload => dispatch => (
  dispatch({
    [CALL_API]: {
      type: CHECK_COMMENT,
      endpoint: '/goods/comments/check',
      method: 'post',
      payload
    }
  })
)