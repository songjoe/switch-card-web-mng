import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import moment from 'moment';


const { Item: FormItem } = Form;
const { RangePicker } = DatePicker;

const Filter = (props:any) => {
  const [ form ] = Form.useForm();

  const { filter, isLoading } = props;

  const onFinish = (values: Store) => {
    const { create } = values;
    if (Array.isArray(create) && create.length === 2) {
      values.startDate = create[0].valueOf();
      values.endDate = create[1].valueOf();
    }
    delete values.create;    
    props.onSearch(values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch();
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 }
    },
  };

  const filelds = Object.entries(filter).map(k => ({
    name: [k[0]],
    value: k[1]
  }))

  return (
    <Form
      {...formItemLayout}
      layout="inline"
      className="app-page-filter"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      fields={filelds}
    >
      <FormItem
        name="name"
        label="姓名"
      >
        <Input placeholder='请输入姓名' />
      </FormItem>

      <FormItem
        name="phone"
        label="手机号"
      >
        <Input placeholder='请输入手机号' />
      </FormItem>

      <FormItem
        name="create"
        label="注册时间"
      >
        <RangePicker
          placeholder={['开始时间', '结束时间']}
          showTime={{
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}
          format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>

      <Form.Item className="buttons-group">
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={isLoading}>
          搜索
        </Button>
        <Button icon={<ReloadOutlined />} onClick={handleReset} loading={isLoading}>
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Filter;