import { useState } from 'react'
import reactLogo from './assets/react.svg'
import beeckerLogo from './assets/beecker.svg'
import UploadButtons from './components/UploadButtons'

function App() {
  const [sampleNum, setSampleNum] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [snaping, setSnaping] = useState(false);
  const [readyState, setReadyState] = useState(false);

  const HEIGHT = 265;
	const WIDTH = 265;

  const startVideo = () => {
		setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByTagName('video')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
	};

  const timer = ms => new Promise(res => setTimeout(res, ms));

  async function snapshot (){
    setSnaping(true);
    const video = document.getElementsByTagName('video')[0];
    const video_height = video.videoHeight;
    const video_width = video.videoWidth;
    const sample_counter = document.getElementsByTagName('h2')[0];
    let counter = sampleNum;
    let sx = 0;
    let sy = 0;
    let s_size = 0;
    if (video_height < video_width){
      sx = (video_width - video_height) / 2;
      sy = 0;
      s_size = video.videoHeight;
    } else {
      sx = 0;
      sy = (video_height - video_width) / 2;
      s_size = video.videoWidth;
    }

    for (let i = 0; i < 500; i++) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const new_element = document.createElement('li');
      const samples_container = document.querySelector('ol');
      canvas.width = 224;
      canvas.height = 224;
      ctx.drawImage(video, sx, sy, s_size, s_size, 0, 0, 224, 224);
      new_element.key = sampleNum;

      new_element.appendChild(canvas);
      samples_container.appendChild(new_element);
      counter += 1;
      sample_counter.textContent = `Samples(${counter})`
      await timer(30);
    }

    setSampleNum(counter);
    setReadyState(true);
  }

  return (
    <>
      <div className='App-container'>
        <header className="App-header">
          <img src={beeckerLogo} alt="logo" className="App-logo" />
          <h1>Face Recognition</h1>
        </header>
        <main className='Workspace'>
          <div className="Input-area">
            <input 
              type="text" 
              name="username" 
              className='username'
              autoComplete='off' 
              placeholder='write your name here'
              required
              />
            <div className="webcam-container">
              {
                playing ? 
                <>
                  <video 
                  height={HEIGHT}
                  width={WIDTH}
                  muted
                  autoPlay
                  ></video>
                  {
                    snaping 
                    ? <></> 
                    : <button className="webcam-button" onClick={snapshot}> 
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0161 2.39801e-05C27.9526 0.0161026 36.0241 8.11167 35.9999 18.0322C35.9758 27.9687 27.8722 36.0402 17.9598 36.008C8.03126 35.9598 -0.00803327 27.8964 6.02421e-06 17.992C0.00804531 8.05539 8.09557 -0.0160546 18.0161 2.39801e-05ZM18.0402 11.5686C14.4788 11.5525 11.5846 14.4225 11.5685 17.9678C11.5605 21.5132 14.4145 24.4073 17.9357 24.4314C21.5051 24.4555 24.4073 21.5936 24.4234 18.0563C24.4475 14.4868 21.5855 11.5846 18.0402 11.5686Z" fill="#EEEEED"/>
                    <path d="M18.0402 11.5684C21.5855 11.5845 24.4475 14.4866 24.4314 18.048C24.4154 21.5934 21.5051 24.4473 17.9437 24.4232C14.4225 24.3991 11.5686 21.5049 11.5766 17.9596C11.5847 14.4223 14.4788 11.5603 18.0402 11.5684Z" fill="#E9473A"/>
                    </svg>
                    </button>
                  }
                  
                </>
                :
                <div style={{height:HEIGHT, width:WIDTH, backgroundColor:"#E9E9E9", display:"flex", flexDirection:"column", alignItems:'center', justifyContent:'center'}}>
                  <h3 style={{textAlign:'center'}}>Your camera is not active, please turn it on.</h3>
                  <button className='' onClick={startVideo}>Power On</button>
                </div>
              }
              
            </div>
          </div>
          <div className="Preview-area">
            <h2>Samples({sampleNum})</h2>
            <div className="Sample-visualizer">
              <ol className='Sample-container'>
              
              </ol>
            </div>
            {
              readyState ? <UploadButtons /> : <></> 
            }
          </div>
        </main>
      </div>
      
    </>
  );
}


export default App
