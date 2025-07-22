import { useInputDebounce } from "@/helper";
import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";

interface DropdownProps {
  menu?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  isFetching?: boolean;
  fetchFunction?: (name: string) => Promise<void>;
  showSearch?: boolean;
}

export const Dropdown = ({
  menu,
  isFetching,
  fetchFunction,
  showSearch = true,
}: DropdownProps) => {
  const [searchValue, setSearchValue] = useState("");
  const searchDebounceValue = useInputDebounce(searchValue, 1000);

  useEffect(() => {
    void fetchFunction?.(searchDebounceValue);
  }, [searchDebounceValue]);

  return (
    <>
      {showSearch ? (
        <>
          <div
            style={{
              padding: 4,
            }}
          >
            <Input
              styles={{
                input: {
                  width: "100%",
                },
              }}
              disabled={isFetching}
              autoFocus={true}
              suffix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
          <Divider style={{ margin: "2px 0 8px 0" }} />
        </>
      ) : (
        <></>
      )}
      {isFetching ? (
        <div
          style={{
            textAlign: "center",
            padding: 20,
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        menu
      )}
    </>
  );
};
