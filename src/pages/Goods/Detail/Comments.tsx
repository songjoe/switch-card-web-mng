import React, { useEffect, useState } from 'react';
import { Comment, Avatar, Tooltip, Pagination, Statistic, Button, Tag } from 'antd';
import {  LikeOutlined } from '@ant-design/icons';
import moment from 'moment';

import { IGoodsCommentsProps, IGoodsComment, IMeta } from '@/types';
import CheckComment from './CheckComment';
import styles from './../styles.less';

const Comments = (props: IGoodsCommentsProps) => {

  const { baseId, onGetComment, commentCount, isLoading, onCheckComment } = props;
  const [ comments, setComments ]: [ Array<IGoodsComment>, any ] = useState([]);
  const [ pagination, setPagination ]: [ IMeta, any ] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [ checkComment, setCheckComment ] = useState({
    visible: false,
    baseId: '',
    content: ''
  })

  useEffect(() => {
    handleGetComments(pagination);
    // eslint-disable-next-line
  }, [])

  const handleGetComments = (values: any) => {
    onGetComment({
      ...values,
      goodsId: baseId
    }).then((res: any) => {
      if (res.code === 200) {
        setComments(res.response || []);
        setPagination(res.meta || {})
      }
    })
  }

  const handlePaginationChange = (current: number) => {
    handleGetComments({
      ...pagination,
      current
    });
  }

  const handleShowSiezChange = (_:number, pageSize: number) => {
    handleGetComments({
      ...pagination,
      current: 1,
      pageSize
    });
  }

  const handleCheck = (id: string, content: string) => {
    setCheckComment({
      visible: true,
      baseId: id,
      content: content
    })
  }

  const handelCancel = () => {
    setCheckComment({
      visible: false,
      baseId: '',
      content: ''
    })
  }

  const handleCheckCalllback = (id: string, state: 1 | 2 | 3, remarks?: string) => {
    setComments((pre: Array<IGoodsComment>) => (
      pre.map((comment: IGoodsComment) => {
        if (comment.id === id) {
          comment.state = state;
          remarks && (comment.remarks = remarks);
        }
        return comment
      })
    ))
  }

  const handleRenderComments = (commenes: Array<IGoodsComment>) => {
    const getAction = (comment: IGoodsComment) => ([
      <span key="like">
        <LikeOutlined />
        <span className={styles.commentAction}>{comment.likeCount}</span>
      </span>,
      <span key="operating">
        {
          comment.state === 1 ? (
            <Button type='link' onClick={() => handleCheck(comment.id, comment.content)}>审核</Button>
          ) : [
            <Tag key='1' color={comment.state === 2 ? '#87d068' : '#ff5500'}>{comment.state === 2 ? '审核通过' : '审核不通过'}</Tag>,
            <span key='2'> {comment.remarks}</span>
          ]
        }
      </span>
    ]);
    return (
      commenes.map((comment: IGoodsComment, index: number) => (
        <Comment
          key={index}
          actions={getAction(comment)}
          author={comment.author}
          avatar={
            <Avatar
              src={comment.avatar}
              alt={comment.author}
            />
          }
          content={`${comment.toUserName ? '回复@' + comment.toUserName + ': ' : ''}${comment.content}`}
          datetime={
            <Tooltip title={moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(comment.createDate).fromNow()}</span>
            </Tooltip>
          }
        >
          {
            comment.comment ? handleRenderComments(comment.comment) : null
          }
        </Comment>
      ))
    )
  }

  return (
    <>
      <div className={styles.commenrsWrap}>
        <Statistic title="总评论数" value={commentCount} valueStyle={{ color: '#ff4d4f' }} />
        {handleRenderComments(comments)}
      </div>
      <Pagination
        total={pagination.total}
        current={pagination.current}
        pageSize={pagination.pageSize}
        hideOnSinglePage
        showSizeChanger
        showQuickJumper
        onChange={handlePaginationChange}
        onShowSizeChange={handleShowSiezChange}
        style={{ textAlign: 'right' }}
        disabled={isLoading}
      />
      <CheckComment
        visible={checkComment.visible}
        baseId={checkComment.baseId}
        onCancel={handelCancel}
        content={checkComment.content}
        onCheckComment={onCheckComment}
        isLoading={isLoading}
        onCheckCallback={handleCheckCalllback}
      />
    </>
    
  );
}

export default Comments;