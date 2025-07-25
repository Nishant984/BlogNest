import { IKContext } from "imagekitio-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );
    if (!response.ok) throw new Error(await response.text());
    const { signature, expire, token } = await response.json();
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Auth error: ${error.message}`);
  }
};

const Upload = ({ children, type = "image", setProgress, setData }) => {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Must be under 10MB.");
      return;
    }

    try {
      let finalFile = file;

      // Only compress if image
      if (type === "image") {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        finalFile = await imageCompression(file, options);
        setPreview(URL.createObjectURL(finalFile));
      }

      setUploading(true);
      const { signature, expire, token } = await authenticator();

      const formData = new FormData();
      formData.append("file", finalFile);
      formData.append("fileName", finalFile.name);
      formData.append("useUniqueFileName", "true");
      formData.append("publicKey", import.meta.env.VITE_IK_PUBLIC_KEY);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("token", token);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload", true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setProgress?.(progress);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          setData?.(res);
          setUploaded(true);
          toast.success("Upload successful!");
        } else {
          toast.error("Upload failed.");
        }
      };

      xhr.onerror = () => {
        toast.error("Upload error.");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      toast.error("Upload/compression failed.");
      setUploading(false);
    }
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <div className="relative flex flex-col items-start">
        <input
          ref={ref}
          type="file"
          accept={`${type}/*`}
          onChange={handleUpload}
          className="hidden"
        />
        <div onClick={() => ref.current.click()} className="cursor-pointer">
          {children}
        </div>

        <div className="mt-2 flex flex-col gap-1">
          {uploading && (
            <span className="text-xs text-yellow-400 animate-pulse">
              Uploading...
            </span>
          )}
          {uploaded && !uploading && (
            <span className="text-xs text-green-400">Uploaded</span>
          )}
          {preview && type === "image" && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-auto rounded-xl object-cover shadow-md"
            />
          )}
        </div>
      </div>
    </IKContext>
  );
};

export default Upload;
