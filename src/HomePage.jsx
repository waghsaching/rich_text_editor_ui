import React from 'react';
import { Editor } from './Editor';
import  EditorService  from './editorService';
export class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editableData:{
                "time" : 1620987102264,
                "blocks" : [
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "Editor.js",
                            "level" : 5
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                        }
                    },
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "Key features",
                            "level" : 3
                        }
                    },
                    {
                        "type" : "list",
                        "data" : {
                            "style" : "ordered",
                            "items" : [
                                "It is a block-styled editor",
                                "It returns clean data output in JSON",
                                "Designed to be extendable and pluggable with a simple API"
                            ]
                        }
                    },
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "What does it mean «block-styled editor»",
                            "level" : 3
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
                        }
                    },
                    {
                        "type" : "header",
                        "data" : {
                            "text" : "What does it mean clean data output",
                            "level" : 3
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
                        }
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "Clean data is useful to sanitize, validate and process on the backend."
                        }
                    },
                    {
                        "type" : "delimiter",
                        "data" : {}
                    },
                    {
                        "type" : "paragraph",
                        "data" : {
                            "text" : "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                        }
                    },
                    {
                        "type" : "image",
                        "data" : {
                            "file" : {
                                "url" : "https://codex.so/public/app/img/external/codex2x.png"
                            },
                            "caption" : "",
                            "withBorder" : false,
                            "stretched" : false,
                            "withBackground" : false
                        }
                    }
                ],
                "version" : "2.20.2"
            },
            dataFromApi:{},
            loading: false
        };
        this.onEditorDataChange = this.onEditorDataChange.bind(this)
        this.editorServiceInstance = new EditorService();
        this.saveBtnClick = this.saveBtnClick.bind(this);
    }
    saveBtnClick(){
        let _self = this;
        this.setState({loading:true});
        this.editorServiceInstance.saveData(this.state.editableData).then((res)=>{
            if(res.data){
                //we dont need to call API as we already have the required data in res 
                // still we are fetching the data from db
                _self.getData(res.data._id);
            }
        })
    }
    getData(id){
        let _self = this;
        this.editorServiceInstance.getData(id).then((res)=>{
            if(res.data){
                let obj = {
                    blocks: res.data.blocks,
                    time: new Date().getTime(),
                    version: "2.20.2"
                }
                _self.setState({dataFromApi:obj,loading:false});
            }
        });
    }
    onEditorDataChange ( dataApi, newData) {
        this.state.editableData = newData;
    }
    render(){
        const { editableData, dataFromApi, loading } = this.state;
        return(
           <div className='homepage-wrapper'>
               <div className='wrapper'>
                    <div className='wrapper-left'>
                        <label>Editor:</label>
                        <Editor onEditorDataChange={this.onEditorDataChange} data={editableData}/>
                    </div>
                    <div className='wrapper-right'>
                        <label>Received:</label>
                        <Editor data={dataFromApi}/>
                    </div>
               </div>
               <div className='row'></div>
               <div className='btn-wrapper'>
                    <button type="button" disabled={loading} class="btn btn-primary" onClick={this.saveBtnClick}>Save</button>
               </div>
           </div>
        );
    }
}