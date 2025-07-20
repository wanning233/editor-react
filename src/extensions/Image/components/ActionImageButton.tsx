import { useEffect, useMemo, useRef, useState } from "react";
import { ActiveButton } from "../../../components/ActiveButton";

import { ImageCropper } from "./ImageCropper";
import Image from "../../Image/Image";
import { actionDialogImage } from "../../Image/store";
import { listenEvent } from "../../../utils/customEvents/customEvents";
import { EVENTS } from "../../../utils/customEvents/events.constant";
import { Modal, Button, Input, Tabs, Checkbox } from "antd";

function ActionImageButton(props: any) {
  const [open, setOpen] = useState(false);

  const handleUploadImage = (evt: any) => {
    setOpen(evt.detail);
  };

  const [link, setLink] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const [imageInline, setImageInline] = useState(
    props.editor.extensionManager.extensions.find(
      (extension: any) => extension.name === Image.name
    )?.options.defaultInline || false
  );

  const uploadOptions = useMemo(() => {
    const uploadOptions = props.editor.extensionManager.extensions.find(
      (extension: any) => extension.name === Image.name
    )?.options;

    return uploadOptions;
  }, [props.editor]);

  useEffect(() => {
    const rm1 = listenEvent(
      EVENTS.UPLOAD_IMAGE(props.editor.id),
      handleUploadImage
    );

    return () => {
      rm1();
    };
  }, []);

  async function handleFile(event: any) {
    const files = event?.target?.files;
    if (!props.editor || props.editor.isDestroyed || files.length === 0) {
      return;
    }

    const file = files[0];

    let src = "";
    if (uploadOptions.upload) {
      src = await uploadOptions.upload(file);
    } else {
      src = URL.createObjectURL(file);
    }

    props.editor
      .chain()
      .focus()
      .setImageInline({ src, inline: imageInline })
      .run();
    setOpen(false);
    setImageInline(false);
  }
  function handleLink(e: any) {
    e.preventDefault();
    e.stopPropagation();

    props.editor
      .chain()
      .focus()
      .setImageInline({ src: link, inline: imageInline })
      .run();
    setOpen(false);
    setImageInline(false);
    setLink("");
  }

  function handleClick(e: any) {
    e.preventDefault();
    fileInput.current?.click();
  }

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        icon={props.icon}
      >
        添加图片
      </Button>

      <Modal
        title="添加图片"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Tabs
          defaultActiveKey={
            uploadOptions.resourceImage === "both" ||
            uploadOptions.resourceImage === "upload"
              ? "upload"
              : "link"
          }
        >
          <Tabs.TabPane
            tab="上传"
            key="upload"
            disabled={
              uploadOptions.resourceImage !== "both" &&
              uploadOptions.resourceImage !== "upload"
            }
          >
            <div className="richtext-flex richtext-items-center richtext-gap-[10px]">
              <Button
                className="richtext-mt-1 richtext-w-full"
                onClick={handleClick}
                size="small"
              >
                上传
              </Button>
              <ImageCropper
                editor={props.editor}
                imageInline={imageInline}
                onClose={() =>
                  actionDialogImage.setOpen(props.editor.id, false)
                }
              />
            </div>
            <input
              accept="image/*"
              multiple
              onChange={handleFile}
              ref={fileInput}
              type="file"
              style={{ display: "none" }}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab="链接"
            key="link"
            disabled={
              uploadOptions.resourceImage !== "both" &&
              uploadOptions.resourceImage !== "link"
            }
          >
            <form onSubmit={handleLink}>
              <div className="richtext-flex richtext-items-center richtext-gap-2">
                <Input
                  autoFocus
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="请输入图片链接"
                  required
                  type="url"
                  value={link}
                />
                <Button type="primary">应用</Button>
              </div>
            </form>
          </Tabs.TabPane>
        </Tabs>
        <Checkbox
          checked={imageInline}
          onChange={(e) => setImageInline(e.target.checked)}
        >
          内联
        </Checkbox>
      </Modal>
    </div>
  );
}

export default ActionImageButton;
