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

function Syncfusion({ value, index, onChangeFunction }) {
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
      "BlockQuote",
      "Image",
    ],
  };

  const handleChange = (args) => {
    // console.log("Editor Value:", args.value);
    // if (onChangeFunction) {
      onChangeFunction(args.value, index);
      console.log(args)
    // }
  };

  return (
    <RichTextEditorComponent
      value={value}
      height={400}
      toolbarSettings={toolbarSettings}
      change={handleChange} // Use `change` instead of `onChange`
      saveInterval={0}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
}

export default Syncfusion;
