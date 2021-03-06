import React, { useState } from 'react';
import storage from '../../config/fbConfig';

const ImageThumb = ({ image }) => {
  return (
    <div className="image-thumb border">
      <img
        src={URL.createObjectURL(image)}
        alt={image.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    </div>
  );
};

const ImageSection = (props) => {
  const [image, setImage] = useState(props.imageName);
  const [isFileChosen, setIsFileChosen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const folderName = props.imageCategory + 'Images/';
  const fileName = new Date().getTime().toString() + '.jpg'; // Set filename to current time

  const handleUpload = (e) => {
    setIsFileChosen(true);
    const image = e.currentTarget.files[0];
    setImage(image);

    // Uploading file
    const uploadTask = storage.ref(`${folderName + fileName}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle Progress (store as int)
        setProgress(
          parseInt((snapshot.bytesTransferred * 100) / snapshot.totalBytes)
        );
      },
      (error) => {
        // Handle Errors
        console.log(error.code);
      },
      () => {
        // Handle Successful Upload
        props.handleImgNameChange(fileName);
        setIsUploaded(true);
      }
    );
  };

  const handleDelete = () => {
    setImage('');
    setIsFileChosen(false);
    setIsUploaded(false);
    const deleteRef = storage.ref(`${folderName + fileName}`);
    // Delete the file
    deleteRef
      .delete()
      .then(() => {
        // File deleted successfully
        props.handleImgNameChange('');
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  if (!isFileChosen) {
    return (
      <div>
        <label class="btn form-rounded r-green-button">
          Upload{' '}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            hidden
          ></input>
        </label>
        <br />
        <em>A default image will be assigned if you don't assign your own.</em>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="">
          <ImageThumb image={image} />
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            >
              {isUploaded ? 'Uploaded' : `${progress}%`}
            </div>
          </div>
        </div>
        <div style={{ width: '200px' }}>
          {isUploaded && (
            <button
              className="btn btn-sm btn-circle ml-3 mt-0 bg-white border-danger"
              type="button"
              onClick={handleDelete}
            >
              <i class="fa fa-times text-danger"></i>
            </button>
          )}
        </div>
      </div>
    );
  }
};
export default ImageSection;
