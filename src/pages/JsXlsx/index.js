/*
 * @Author: SongYijie
 * @Date: 2020-09-24 11:02:17
 * @LastEditors: SongYijie
 */
import React, { useState, useRef, useEffect, useContext } from "react";
import { Table, Form, Input, message, Button } from "antd";
import XLSX from "xlsx";

import "./styles.less";

const Header = ['title', 'idCard', 'userPhone', 'bankCard', 'amt']

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const JsXlsx = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files,
      f = files[0];
    if (!f) return;
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      console.log("workbook", workbook);
      /* DO SOMETHING WITH workbook HERE */
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      let jsonContent = XLSX.utils.sheet_to_json(sheet, {
        header: Header,
      });
      console.log("jsonContent", jsonContent);
      if (!Array.isArray(jsonContent) || jsonContent.length <= 1) {
        return;
      }
      
      const header = jsonContent.splice(0, 1)[0];
      let columns = [];
      for (let item in header) {
        columns.push({
          title: header[item],
          dataIndex: item,
          width: "20%",
        });
      }
      jsonContent = jsonContent.map((item, index) => ({
        ...item,
        key: index
      }));
      setColumns(columns);
      setTableData(jsonContent);
      setIsLoading(false);
    };
    reader.readAsArrayBuffer(f);
  };

  const handleSave = row => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => row.key === item.key);
    if (index === -1) {
      message.error("保存失败");
      return;
    }
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTableData(newData);
  };

  const handleJsonToSheet = () => {
    let data = JSON.parse(JSON.stringify(tableData))
    data = data.map(item => {
      delete item.key;
      return item;
    })
    let header = {}
    columns.forEach(item=> {
      header[item.dataIndex] = item.title;
    })
    data.unshift(header)
    const sheet = XLSX.utils.json_to_sheet(data, {
      header: Header,
      skipHeader: true
    });
    openDownloadDialog(sheet2blob(sheet), "导出.xlsx");
  };

  const openDownloadDialog = (url, saveName) => {
    if (typeof url == "object" && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    const aLink = document.createElement("a");
    aLink.href = url;
    aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent("click");
    else {
      event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
    }
    aLink.dispatchEvent(event);
  };

  const sheet2blob = (sheet, sheetName) => {
    sheetName = sheetName || "sheet1";
    const workbook = {
      SheetNames: [sheetName],
      Sheets: {},
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    const wopts = {
      bookType: "xlsx", // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: "binary",
    };
    const wbout = XLSX.write(workbook, wopts);
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    return blob;
  };

  return (
    <div>
      <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
      <Table
        className="app-page-table"
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        columns={columns.map((col, index) => {
          const editable = index !== 3 && index !== 4;
          if (!editable) {
            return col;
          }
          return {
            ...col,
            onCell: (record) => ({
              record,
              editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave,
            }),
          };
        })}
        dataSource={tableData}
        loading={isLoading}
        pagination={{
          showQuickJumper: true,
          disabled: isLoading,
        }}
      />
      <Button onClick={handleJsonToSheet}>生成</Button>
    </div>
  );
};

export default JsXlsx;
