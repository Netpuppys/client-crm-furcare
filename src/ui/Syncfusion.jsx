import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import React from "react";
import "@syncfusion/ej2-base/styles/bootstrap5.css";
import "@syncfusion/ej2-icons/styles/bootstrap5.css";
import "@syncfusion/ej2-buttons/styles/bootstrap5.css";
import "@syncfusion/ej2-splitbuttons/styles/bootstrap5.css";
import "@syncfusion/ej2-inputs/styles/bootstrap5.css";
import "@syncfusion/ej2-lists/styles/bootstrap5.css";
import "@syncfusion/ej2-navigations/styles/bootstrap5.css";
import "@syncfusion/ej2-popups/styles/bootstrap5.css";
import "@syncfusion/ej2-richtexteditor/styles/bootstrap5.css";
function Syncfusion({ value, onChangeFunction }) {
  const toolbarSettings = {
    items: [
      "Undo",
      "Redo",
      "Formats",
      "Alignments",
      "FontColor",
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "SourceCode",
      "ClearFormat",
      "UnorderedList",
      "OrderedList",
      "CreateLink",
      "Image",
    ],
  };
  return (
    <RichTextEditorComponent
      value={value}
      height={400}
      toolbarSettings={toolbarSettings}
      onChange={onChangeFunction}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
}

export default Syncfusion;
