import { SmileOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { InputFocusOptions } from "antd/es/input/Input";
import { TextAreaRef as AntdTextAreaRef } from "antd/es/input/TextArea";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import insertTextAtCursor from "insert-text-at-cursor";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface TextAreaRef
  extends Omit<AntdTextAreaRef, "focus" | "blur" | "resizableTextArea"> {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  resizableTextArea?: AntdTextAreaRef["resizableTextArea"];
}

const { TextArea } = Input;

interface TextAreaWithEmojiProps {
  defaultValue?: string;
  onChange?: (content?: string) => void;
}

const TextAreaWithEmoji = ({
  defaultValue = "",
  onChange,
}: TextAreaWithEmojiProps) => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(defaultValue);
  const textAreaRef = useRef(null);

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
    onChange?.(e.target.value);
  };

  const onEmojiClick = (e: EmojiClickData, event: MouseEvent) => {
    if (textAreaRef.current) {
      event.stopPropagation();
      insertTextAtCursor(textAreaRef.current, e.emoji);

      const newContent = (textAreaRef.current as TextAreaRef).resizableTextArea
        ?.textArea.value;

      setTextAreaValue(newContent as string);
      onChange?.(newContent);
    }
  };

  const windowHandleCloseEmojiDropdown = () => {
    setIsShowEmoji(false);
  };

  const stopPropagation = (e: Event) => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("click", windowHandleCloseEmojiDropdown);
    return () => {
      window.removeEventListener("click", windowHandleCloseEmojiDropdown);
    };
  }, []);

  useEffect(() => {
    let emojiDropdown: Element | null;
    if (isShowEmoji) {
      setTimeout(() => {
        emojiDropdown = document.querySelector("aside.EmojiPickerReact");
        emojiDropdown?.addEventListener("click", stopPropagation);
      });
    }
    return () => {
      emojiDropdown?.removeEventListener("click", stopPropagation);
    };
  }, [isShowEmoji]);

  useEffect(() => {
    onTextareaChange({
      target: { value: defaultValue },
    } as ChangeEvent<HTMLTextAreaElement>);
  }, [defaultValue]);

  return (
    <div className={styles["text-area-wrapper"]}>
      <TextArea
        ref={textAreaRef}
        autoSize={{ minRows: 4, maxRows: 10 }}
        count={{
          show: true,
          max: 2200,
        }}
        value={textAreaValue}
        onChange={onTextareaChange}
      />
      <SmileOutlined
        onClick={(e) => {
          e.stopPropagation();
          setIsShowEmoji((prev) => !prev);
        }}
      />
      <div className="emojiPicker-wrapper">
        <EmojiPicker
          open={isShowEmoji}
          style={{
            position: "absolute",
            marginTop: 8,
          }}
          onEmojiClick={onEmojiClick}
        />
      </div>
    </div>
  );
};

export default TextAreaWithEmoji;
