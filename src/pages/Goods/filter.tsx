import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { Store } from 'rc-field-form/lib/interface';
import moment from 'moment';

import { GoodsState, getOption } from '@/constants/pageStatus';

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
      form={form}
      fields={filelds}
    >
      <FormItem
        name="name"
        label="名称"
      >
        <Input placeholder='请输入名称' />
      </FormItem>

      <FormItem
        name="create"
        label="创建时间"
      >
        <RangePicker
          placeholder={['开始时间', '结束时间']}
          showTime={{
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}
          format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>

      <FormItem
        name="state"
        label="状态"
      >
        <Select placeholder="请选择状态">
          {
            getOption(GoodsState)
          }
        </Select>
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