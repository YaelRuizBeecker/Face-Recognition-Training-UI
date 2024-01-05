import upload_icon from '../assets/upload_icon.svg';
import cancel_icon from '../assets/cancel_icon.svg';


const uploadImage = async (username, image) => {

    const serverURL = 'https://7a23-34-41-130-47.ngrok-free.app/receiveBatch';
    
    try {
        const formData = new FormData();
        formData.append('name', username);
        formData.append('image', JSON.stringify(image));
        const response = await fetch(serverURL, {
            method: 'POST',
            // Note: Do not set 'Content-Type' in headers for FormData
            body: formData,
        });
        const responseData = await response.json();
        // alert("Thank you " + username + " " + responseData.body)
        console.log(responseData);
        return responseData
    } catch (error) {
        console.log(error);
        return -1
    }
}

const cancelUpload = () => {
    location.reload();
}


const uploadBatch = async (setOpenModal, e)=> {
    e.target.disabled = true;
    const image_batch = []
    const samples = document.querySelectorAll('canvas');
    const username = document.querySelector('input').value;
    if (username === ''){
        alert('Escriba su nombre antes de subir las imágenes.');
        document.querySelector('input').focus();
        e.target.disabled = false;
        return 
    }
    document.querySelector('video').remove();
    setOpenModal(true);
    samples.forEach(sample => {
        image_batch.push(sample.toDataURL('image/jpeg', 1.0));
    });
    for (let i = 0; i < samples.length; i++) {
        await uploadImage(username, image_batch[i]);
    }
    alert("Thank you " + username + ". The images were uploaded successfully.");
    cancelUpload();
}

function UploadButtons({ setOpenModal }){
    return (
        <div className="Buttons-container">
            <button className='btn btn-cancel' onClick={cancelUpload}> 
                <p>Cancel</p>
                <img src={cancel_icon} alt="cancel icon" />
            </button> 
            <button className='btn btn-upload' onClick={(e)=>{
                e.target.disabled = true;
                uploadBatch(setOpenModal, e);
            }}>
                <p>Upload</p>
                <img src={upload_icon} alt="upload icon" />
            </button>
        </div>
    );
}

export default UploadButtons