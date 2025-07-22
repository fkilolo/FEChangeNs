import { buildQuery } from "@/helper";
import { Select as AntdSelect, SelectProps } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { isFunction } from "lodash";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IBackendRes } from "@/types/model/base/base.d";

const params = {
  current: 1,
  pageSize: 20,
};

const sort = {
  name: "ascend",
};

export interface BaseObjectResponse {
  name?: string;
  _id?: string;
}

type AntdSelectProps = React.ComponentProps<typeof AntdSelect>;

interface MySelectProps<T extends BaseObjectResponse>
  extends Omit<AntdSelectProps, "onChange"> {
  onChange?: <T>(value: SelectProps["value"], option: T) => void;
  fetchFunction?: (
    name: string
  ) =>
    | Promise<AxiosResponse<IBackendRes<IModelPaginate<T>>, any>>
    | Promise<IBackendRes<IModelPaginate<T>>>;
  accessoryPrefixOptionName?: keyof T;
}

export const Select = <T extends BaseObjectResponse>({
  fetchFunction,
  onChange,
  accessoryPrefixOptionName,
  showSearch,
  options: defaultOptions,
  ...props
}: MySelectProps<T>) => {
  const [options, setOptions] = useState<
    (DefaultOptionType | BaseOptionType)[] | undefined
  >(defaultOptions);
  const [isFetching, setIsFetching] = useState(false);

  const fetchFunctionHandler = async (name: string) => {
    if (isFunction(fetchFunction)) {
      setIsFetching(true);
      const queryString = buildQuery({ ...params, name: name }, sort);
      const res : any = await fetchFunction?.(queryString);
      if (res) {
        const _options = res.result.map((item: any) => ({
          label: `${
            accessoryPrefixOptionName
              ? `${item[accessoryPrefixOptionName]}: `
              : ""
          }${item.name}`,
          value: item._id,
        }));
        setOptions(_options);
      } else {
        setOptions([]);
      }
      setIsFetching(false);
    }
  };

  useEffect(() => {
    void fetchFunctionHandler("");
  }, []);

  return (
    <AntdSelect
      {...props}
      style={{
        width: "100%",
        ...props.style,
      }}
      loading={isFetching}
      options={options}
      onChange={(value, option) => {
        onChange?.<DefaultOptionType>(value, option as DefaultOptionType);
      }}
      dropdownRender={(menu) => (
        <Dropdown
          showSearch={showSearch}
          menu={menu}
          isFetching={isFetching}
          fetchFunction={fetchFunctionHandler}
        />
      )}
    />
  );
};
