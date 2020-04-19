// import {Device} from "../../devices"
import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

declare var MediaRecorder: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  devicesList: Array<string> = [];
  mediaRecorder: any;
  chunks = [];
  audioFiles = [];
  nameAudio:string = "FraseGrabada.mp3";
  frase:string = "LA persona dijó: ...... ";
  path:string = "https://transmediacatalonia.uab.cat/signem/img/aA.jpg";
  flagRecording:boolean;
  
	constructor(private cd: ChangeDetectorRef, private dom: DomSanitizer) {}

  ngOnInit() {
    navigator.getUserMedia(
			{audio: true},
			stream => {
				console.log(stream);
        this.mediaRecorder = new MediaRecorder(stream);
        
        //Stop recording
				this.mediaRecorder.onstop = e => {
					console.log('data available after MediaRecorder.stop() called.');
					var blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'});
					this.chunks = [];
					var audioURL = URL.createObjectURL(blob);
					this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
					console.log(audioURL);
					console.log('recorder stopped');
          this.cd.detectChanges();
          //download
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.href = audioURL;
          a.download = this.nameAudio ;          
          a.click();
          window.URL.revokeObjectURL(audioURL);
        };
        
        //Audio fragments added
				this.mediaRecorder.ondataavailable = e => {
					this.chunks.push(e.data);
        };
        
			},
			() => {
				alert('Error capturing audio.');
			},
		);
  }

  startRecording() {
		this.mediaRecorder.start();
		console.log(this.mediaRecorder.state);
    console.log('recorder started');
    this.flagRecording=true;
	}
  
  stopRecording() {
		this.mediaRecorder.stop();
		console.log(this.mediaRecorder.state);
    console.log('recorder stopped');
    this.flagRecording=false;
  }
  
  getDevices(){
    navigator
        .mediaDevices
        .enumerateDevices()
        .then(dispositivos => {
            dispositivos.forEach((dispositivo, indice) => {
                if (dispositivo.kind === "audioinput") {
                  this.devicesList.push(dispositivo.deviceId)
                }
            })
        })
        .then(()=>{ 
          console.log(this.devicesList)
         } 
        )
  }


}
