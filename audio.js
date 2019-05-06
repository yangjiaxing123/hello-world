import {Recorder} from './utils/index';
import  React from 'react';

window.onload = function init(){
    try{
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        audio_context = new AudioContext();
    }catch(e){
        alert('no web audio support in this browser');
    }
}

let recorder;
let audio_context;

export default class Record extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fileDataBLob:'',
        }
        this.startRecording=this.startRecording.bind(this);
        this.stopRecording=this.stopRecording.bind(this);
    }

    componentDidMount(){
        let getUserMedia_1 = (navigator.getUserMedia || navigator.webkitGetUserMedia|| navigator.mozGetUserMedia || navigator.msGetUserMedia);
       //录音接口成功调用，则执行this.startusermedia 否则执行 function（e）
        getUserMedia_1.call(navigator,{audio:true},this.startUserMedia,function(e){
            console.log('No live audio input:'+e);
        });
    }

    //初始化录音功能
    startUserMedia = (stream)=>{
        audio_context = new AudioContext();
        var input =audio_context.createMediaStreamSource(stream);
        recorder = new Recorder(input);

    }

    //开始录音
    startRecording(){
        console.log('开始录音');
        recorder && recorder.record()
       
    }

    //停止录音
    stopRecording() {
        console.log('停止录音');
        recorder && recorder.stop()
        this.createDownloadLink()
        recorder.clear()
      
    }

    createDownloadLink=()=>{
        recorder && recorder.exportWAV((blob) => {
            console.log(blob);
            this.downLoad(blob);
            this.setState({
                fileDataBLob:blob,
            })
            if(!blob){
                console.log('无录音文件');
                return false;
            }else{
                var url = URL.createObjectURL(blob);
                console.log(url);
            }
        });
    }

    downLoad(blob){
        Recorder. forceDownload(blob,'my-audio-file');
        console.log('下载成功');
    }
    render(){
        return(
            <div>
                <button onClick={this.startRecording}>录音</button>
                <button onClick={this.stopRecording}>停止</button>
            </div>
        )
    }
}

