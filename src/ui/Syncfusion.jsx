import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import React, { useEffect, useRef } from "react";
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
  const editorRef = useRef(null); // Reference to the editor

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current;
      
      // Add an input event listener to detect changes instantly
      editorInstance.element.addEventListener("input", () => {
        const newValue = editorInstance.getContent(); // Get updated content
        if (onChangeFunction && newValue) {
          onChangeFunction(newValue.lastChild.innerHTML, index); // Update parent component instantly
        }
      });
    }
  }, [index]);

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

  return (
    <RichTextEditorComponent
      ref={editorRef} // Attach reference
      value={value}
      height={400}
      toolbarSettings={toolbarSettings}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
}

export default Syncfusion;
