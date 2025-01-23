import {
  BlockTypeSelect,
  ChangeAdmonitionType,
  ConditionalContents,
  StrikeThroughSupSubToggles,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React, { useEffect, useRef } from "react";
const {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  useCodeBlockEditorContext,
  linkDialogPlugin,
  CreateLink,
  InsertImage,
  imagePlugin,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  tablePlugin,
  InsertTable,
  ListsToggle,
  Separator,
} = await import("@mdxeditor/editor");

function whenInAdmonition(editorInFocus) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }

  return ["note", "tip", "danger", "info", "caution"].includes(
    node.getMdastNode().name
  );
}

const PlainTextCodeEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea
          rows={3}
          cols={20}
          defaultValue={props.code}
          onChange={(e) => cb.setCode(e.target.value)}
        />
      </div>
    );
  },
};

const Editor = ({ onChange, markdown = "Your content", defaultValue }) => {
  const mdxEditorRef = useRef(null);

  useEffect(() => {
    if (defaultValue) {
      mdxEditorRef.current.setMarkdown(defaultValue);
    }
  }, [defaultValue]);

  return (
    <MDXEditor
      ref={mdxEditorRef}
      onChange={onChange}
      markdown={markdown}
      plugins={[
        codeBlockPlugin({
          codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
        }),
        headingsPlugin(),
        listsPlugin(),
        imagePlugin(),
        linkPlugin(),
        quotePlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        linkDialogPlugin(),
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <Separator />
              <StrikeThroughSupSubToggles />
              <Separator />
              <ListsToggle />
              <Separator />
              <ConditionalContents
                options={[
                  {
                    when: whenInAdmonition,
                    contents: () => <ChangeAdmonitionType />,
                  },
                  { fallback: () => <BlockTypeSelect /> },
                ]}
              />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
