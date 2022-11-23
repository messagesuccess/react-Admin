import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const  TextEditor =React.forwardRef((props,ref) =>  {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }
    const getDetil = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    return (
        <div>
            <Editor
               ref={ref}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorStyle={{ border: '1px solid black', minHeight: '200px' }}
                onEditorStateChange={onEditorStateChange}
                getDetil={getDetil}
            />
        </div>
    )
})
export default TextEditor
