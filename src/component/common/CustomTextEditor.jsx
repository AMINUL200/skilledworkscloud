// components/CustomTextEditor.jsx

import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const CustomTextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  height = 400,
  disabled = false,
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: disabled,
      placeholder,

      height,
      toolbarButtonSize: "middle",
      toolbarAdaptive: false,

      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html",

      showXPathInStatusbar: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showPlaceholder: true,

      removeButtons: [
        "image",
        "file",
        "video",
        "media",
        "source",
        "about",
        "print",
        "symbols",
        "table",
        "hr",
      ],

      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",

        "|",

        "ul",
        "ol",
        "outdent",
        "indent",

        "|",

        "font",
        "fontsize",
        "brush",
        "paragraph",

        "|",

        "align",

        "|",

        "undo",
        "redo",

        "|",

        "link",
        "unlink",

        "|",

        "copyformat",

        "|",

        "fullsize",
        "preview",
      ],
    }),
    [disabled, placeholder, height]
  );

  return (
    <div className="custom-text-editor">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onChange={(newContent) => {
          onChange?.(newContent);
        }}
      />
    </div>
  );
};

export default CustomTextEditor;