import Pako from "pako";
import React, { useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { resizeImage } from "../../lib/utils/reduceImgSize";
import pako from "pako";

interface Props {
  setThumbPhoto: any;
}
export function PhotoUploader({ setThumbPhoto }: Props) {
  const [images, setImages] = React.useState<any>([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  console.log(images, "bb");

  useEffect(() => {
    if (images[0]?.dataURL) {
      resizeImage(images[0]?.dataURL).then((result) => {
        if (result) {
          setThumbPhoto(pako.deflate(result));
        }
      });
    }
  }, [images, setThumbPhoto]);

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        acceptType={["jpg", "png", "jpeg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
