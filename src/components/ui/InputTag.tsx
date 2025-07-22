import { Select } from "antd";
import { SelectProps } from "antd/lib";
import { isArray } from "lodash";
import { useEffect, useState } from "react";

type InputTagProps = Pick<SelectProps, "onChange" | "placeholder"> & {
  value: string | string[]
};

const InputTag = ({ onChange, value, placeholder }: InputTagProps) => {
  const [tags, setTags] = useState<string[]>(isArray(value) ? value : value?.split(','));
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTags(isArray(value) ? value : value?.split(','));
  }, [value]);

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder={placeholder}
      dropdownStyle={{
        display: "none",
      }}
      onChange={(value, options) => {
        if (!tags.includes(inputValue)) {
          onChange?.(value, options);
          setTags(value);
          setInputValue("");
        }
      }}
      searchValue={inputValue}
      onSearch={(value) => setInputValue(value)}
      value={tags}
    />
  );
};

export default InputTag;
