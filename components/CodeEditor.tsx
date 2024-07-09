"use client"
import React, { useEffect } from 'react'
import { Resizable } from 're-resizable'
import AceEditor from 'react-ace'

//themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";

//languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";

interface CodeEditorProps{
    onCodeChange : (code : string)=> void;
    language : string;
    theme : string;
    icon : string;
    background?: string;
    currentPadding?: string;
}


export default function CodeEditor({
    onCodeChange, 
    language, 
    theme, 
    icon, 
    background, 
    currentPadding

} : CodeEditorProps ) {

    const [width, setWidth] = React.useState(1000);
    const [height, setHeight] = React.useState<number | null>(500);

    // @ts-ignore
    const handleResize = (evt, direction, ref, pos) => {
        const newHeight = ref.style.height;
        setHeight(parseInt(newHeight));
    };

    const updateSize = ()=> {
        setWidth(window.innerWidth);
    }

    useEffect(()=> {
        window.addEventListener('resize', updateSize);
        updateSize();

        return ()=> window.removeEventListener('resize', updateSize);
    },[]);
    
    return <Resizable
        minHeight={466}
        minWidth={510}
        maxWidth={1000}
        defaultSize={{
            width : width,
            height : height || 500,
        }}

        onResize={handleResize}
        className='resizable_container relative  bg-red-500'

    >
        <div>
            <AceEditor
            value={`function(){
    console.log("hello");
}`}
            name='UNIQUE_ID_OF_DIV'
            fontSize={16}
            theme='monokai'
            mode={language.toLocaleLowerCase()}
            wrapEnabled={true}
            showPrintMargin={false}
            highlightActiveLine={false}
            showGutter={false}
            editorProps={{$blockScrolling: true}}
            className='ace_editor_container '
            />
        </div>

    </Resizable>
}
