import upload_icon from '../assets/upload_icon.svg';
import cancel_icon from '../assets/cancel_icon.svg';


const uploadBatch = async () => {

    const serverURL = 'http://ada9-34-138-161-212.ngrok-free.app/receiveBatch';
    const image_batch = []
    const samples = document.querySelectorAll('canvas');
    const username = document.querySelector('input').value;
    
    if (username === ''){
        alert('Escriba su nombre antes de subir las imágenes.');
        document.querySelector('input').focus();
        return 
    }

    samples.forEach(sample => {
        image_batch.push(sample.toDataURL('image/jpeg', 1.0));
    });
    
    try {
        console.log('Enviando data a :', serverURL);
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: {name:username, images:JSON.stringify(image_batch)},
        });
        const responseData = await response.json();
        console.log(responseData.body)
    } catch (error) {
        console.log(error);
    }
    cancelUpload();
}

const cancelUpload = async () => {
    location.reload();
}

function UploadButtons(){
    return (
        <div className="Buttons-container">
            <button className='btn btn-cancel' onClick={cancelUpload}> 
                <p>Cancel</p>
                <img src={cancel_icon} alt="cancel icon" />
            </button> 
            <button className='btn btn-upload' onClick={uploadBatch}>
                <p>Upload</p>
                <img src={upload_icon} alt="upload icon" />
            </button>
        </div>
    );
}

export default UploadButtons