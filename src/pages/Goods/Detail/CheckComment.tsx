import React from 'react';
import { Form, Modal, Input, Alert, Radio } from 'antd';

import { ICheckCommentProps } from '@/types';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;

const CheckComment = (props: ICheckCommentProps) => {
  const [ form ] = Form.useForm();
  const { visible, baseId, content, isLoading } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 }
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const { onCheckCallback, onCheckComment } = props;
      onCheckComment({
        ...values,
        commentId: baseId
      }).then((res: any) => {
        if (res.code === 200) {
          onCheckCallback(baseId, values.state, values.remarks);
          handleCancel();
        }
      }); 
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  }

  const handleCancel = () => {
    form.resetFields();
    props.onCancel();
  }

  const options = [
    { label: '通过', value: 2 },
    { label: '拒绝', value: 3 }
  ]

  return (
    <Modal
      visible={visible}
      title="审核评论"
      onCancel={handleCancel}
      maskClosable={false}
      okType="danger"
      onOk={handleOk}
      confirmLoading={isLoading}
    >
      <Form
        {...formItemLayout}
        layout="horizontal"
        form={form}
      >
        <Alert
          message="请审核以下评论是否合规"
          description={content}
          type="info"
          showIcon
          style={{ marginBottom: 12 }}
        />

        <FormItem
          name="state"
          label="审核"
          rules={[{ required: true }]}
        >
          <RadioGroup
            options={options}
          />
        </FormItem>
        
        <FormItem
          name="remarks"
          label="原因"
          rules={[ ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value || getFieldValue('state') === 2) {
                return Promise.resolve();
              }
              return Promise.reject('请输入审核不通过的原因');
            },
          })]}
          dependencies={['state']}
        >
          <TextArea placeholder='请输入原因' />
        </FormItem>
      </Form>
    </Modal>
    
  )
}

export default CheckComment;