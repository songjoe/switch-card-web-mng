import React from 'react';
import { Form, Modal, Input, Alert } from 'antd';

import { ICloseOrderProps } from '@/types';
import styles from './styles.less';

const { Item: FormItem } = Form;
const { TextArea } = Input;

const CloseOrder = (props: ICloseOrderProps) => {
  const [ form ] = Form.useForm();
  const { visible, baseId, baseName, isLoading } = props;
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
      props.onCloseOrder({
        ...values,
        goodsId: baseId
      }, () => handleCancel());
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  }

  const handleCancel = () => {
    form.resetFields();
    props.onCancel();
  }

  return (
    <Modal
      visible={visible}
      title="关闭订单"
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
          message="请谨慎操作!"
          description={<p className={styles.warnInfo}>确定要关闭 <span>{baseName}</span> 订单吗?</p>}
          type="warning"
          showIcon
          style={{ marginBottom: 12 }}
        />
        
        <FormItem
          name="remarks"
          label="关闭原因"
          rules={[{ required: true }]}
        >
          <TextArea placeholder='请输入关闭原因' />
        </FormItem>
      </Form>
    </Modal>
    
  )
}

export default CloseOrder;