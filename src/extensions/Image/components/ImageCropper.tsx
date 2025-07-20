import React, { useRef, useState } from 'react';

import ReactCrop, {
  type Crop,
  type PixelCrop,
} from 'react-image-crop';

import { IconComponent } from '../../../components/icons/icon';

import { Image as ExtensionImage } from '../../Image';
import { dataURLtoFile, readImageAsBase64 } from '../../../utils/file';
import { Modal, Button } from 'antd'; 


export function ImageCropper({ editor, imageInline, onClose }: any) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);
  const [urlUpload, setUrlUpload] = useState<any>({
    src: '',
    file: null,
  });

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );
    }

    return canvas.toDataURL('image/png', 1.0);
  }

  async function onCrop() {
    try {
      const fileCrop = dataURLtoFile(croppedImageUrl, urlUpload?.file?.name || 'image.png');

      const uploadOptions = editor.extensionManager.extensions.find(
        (extension: any) => extension.name === ExtensionImage.name,
      )?.options;

      let src = '';
      if (uploadOptions.upload) {
        src = await uploadOptions.upload(fileCrop);
      } else {
        src = URL.createObjectURL(fileCrop);
      }

      editor.chain().focus().setImageInline({ src, inline: imageInline }).run();

      setDialogOpen(false);

      setUrlUpload({
        src: '',
        file: null,
      });
      onClose();
    } catch (error) {
      console.log('Error cropping image', error);
    }
  }

  function handleClick(e: any) {
    e.preventDefault();
    fileInput.current?.click();
  }

  const handleFile = async (event: any) => {
    const files = event?.target?.files;
    if (!editor || editor.isDestroyed || files.length === 0) {
      return;
    }
    const file = files[0];

    const base64 = await readImageAsBase64(file);

    setDialogOpen(true);
    setUrlUpload({
      src: base64.src,
      file,
    });
  };

  return (
    <>
      <Button className="richtext-mt-1 richtext-w-full" onClick={handleClick} size="small">
        上传
      </Button>

      <Modal
        title="上传"
        visible={dialogOpen}
        onCancel={() => {
          setDialogOpen(false);
          setUrlUpload({ src: '', file: null });
        }}
        footer={null}
      >
        <div>
          {urlUpload.src && (
            <ReactCrop
              className="richtext-w-full"
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => onCropComplete(c)}
            >
              <img alt="Crop me" ref={imgRef} src={urlUpload.src} />
            </ReactCrop>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button onClick={() => {
            setDialogOpen(false);
            setUrlUpload({ src: '', file: null });
          }}>
            取消
          </Button>
          <Button type="primary" onClick={onCrop}>
            裁剪
          </Button>
        </div>
      </Modal>

      <input
        accept="image/*"
        multiple
        onChange={handleFile}
        ref={fileInput}
        type="file"
        style={{ display: 'none' }}
      />
    </>
  );
}
