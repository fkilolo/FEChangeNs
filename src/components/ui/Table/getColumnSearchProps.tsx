import { SearchOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Checkbox, Input, Select, Space, TableColumnType } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { BaseOptionType } from "antd/es/select";
import { cloneDeep, isFunction } from "lodash";
import React, { Key, useState } from "react";

type RequireAtLeastOne<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]-?: Required<Pick<T, P>> & Partial<Omit<T, P>>;
}[K];

type OptionsType = React.ComponentProps<typeof Checkbox.Group>["options"];
type OnfilterChange = ProColumns["onFilter"];
interface Options<DataType, DataIndexType> {
  disableSearch?: boolean;
  filterOptions?: OptionsType;
  onFilter?: OnfilterChange;
  multiple?: boolean;
  placeholder?: string;
  accessoryPath?: `${keyof DataType & string}${'' | `.${string}`}`;
}

export const getColumnSearchProps = <DataType extends Record<string, any> = Record<string, any>>(
  dataIndex: keyof DataType | undefined | null,
  searchPropsOptions?: Options<DataType, typeof dataIndex>
): Pick<
  TableColumnType<DataType>,
  "filterDropdown" | "filterIcon" | "onFilter"
> => {
  const [search, setSearch] = useState("");
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [options, setOptions] = useState<OptionsType>(
    searchPropsOptions?.filterOptions ?? []
  );

  return {
    filterDropdown: ({
      setSelectedKeys: setSearhText,
      selectedKeys: searchText,
      close,
      confirm,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        {!searchPropsOptions?.disableSearch &&
        !searchPropsOptions?.filterOptions ? (
          <Input
            placeholder={searchPropsOptions?.placeholder ?? `Tìm kiếm`}
            value={searchText[0]}
            onChange={(e) => {
              setSearhText(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
        ) : (
          <></>
        )}
        {searchPropsOptions?.filterOptions ? (
          <>
            {!searchPropsOptions?.disableSearch ? (
              <Input
                placeholder={searchPropsOptions?.placeholder ?? `Tìm kiếm`}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value ?? "");
                }}
                style={{ marginBottom: 8, display: "block" }}
              />
            ) : (
              <></>
            )}
            {searchPropsOptions.multiple ? (
              <Checkbox.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 8,
                }}
                options={options ?? []}
                value={checkedList}
                onChange={(val) => {
                  setCheckedList(val);
                  setSearhText([val.join(',')] as Key[]);
                }}
              />
            ) : (
              <div style={{ marginBottom: 8 }}>
                <Select
                  style={{ width: 200 }}
                  placeholder={searchPropsOptions?.placeholder ?? `Tìm kiếm`}
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={options as BaseOptionType[]}
                  allowClear
                  onChange={(val) => {
                      setSearhText([val]); 
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="middle"
          >
            Tìm Kiếm
          </Button>
          <Button
            type="link"
            size="middle"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? "#1677ff" : undefined, fontSize: 20 }}
      />
    ),
    onFilter: (searchValue, record) => {
      if (isFunction(searchPropsOptions?.onFilter))
        return searchPropsOptions.onFilter(searchValue, record);
      let dataValue = cloneDeep(record);
      (() => {
        if (searchPropsOptions?.accessoryPath) {
          return (searchPropsOptions?.accessoryPath as string)
            .split(".")
            .forEach((item) => {
              dataValue = dataValue[item];
            });
        }
        return (dataIndex as string).split(".").forEach((item) => {
          dataValue = dataValue[item];
        });
      })();

      if (searchPropsOptions?.multiple) {
        if (searchValue === '') return true
        return searchValue?.toString()?.toLowerCase()?.includes(dataValue?.toString()?.toLowerCase())
      }

      //if searchPropsOptions?.multiple = false
      if (searchValue === undefined) return true
      return dataValue?.toString().toLowerCase().includes(searchValue?.toString().toLowerCase())
      //end of if searchPropsOptions?.multiple = false
    },
  };
};
