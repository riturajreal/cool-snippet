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
        <div className='code_block'>
            <div className='code_title h-[52px] px-4 flex items-center justify-between bg-black opacity-80'>

                {/* controls */}
                <div className='dots flex items-center gap-1'>
                    <div className='w-3 h-3 rounded-full bg-[#ff5656]'></div>
                    <div className='w-3 h-3 rounded-full bg-[#ffbc6a]'></div>
                    <div className='w-3 h-3 rounded-full bg-[#67f772]'></div>
                </div>

                {/* Snippet Title */}
                <div className='input_control w-full'>
                        <input type="text" className='w-full text-[hsla(0,0%,100%,0.6) outline-none font-medium bg-transparent text-center ' />
                </div>

                {/* Language Icon */}
                <div className='icon flex justify-center items-center p-1 bg-black opacity-30 rounded-md'>
                        <img src={icon} alt="language_icon" />
                </div>
            </div>


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
