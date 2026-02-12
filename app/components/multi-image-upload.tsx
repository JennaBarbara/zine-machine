
import { useCallback, useRef} from "react"
import Button from "./button"

interface MultiImageUploadProps {
setPreviews: (urls: {url: string, id: number}[]) => void
     setError: (error: string | null) => void
}

export default function MultiImageUpload({ setPreviews, setError}: MultiImageUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
 

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleClick = useCallback(() => {
   hiddenFileInput.current?.click()
  },[hiddenFileInput])

  const selectImagesHandler = useCallback(async (images: FileList | null) => {
    setError(null)
    if (images) {
        const imageArray = Array.from(images)
        const urls = await Promise.all(imageArray.map(async (image: File) => await getBase64(image)))
        setPreviews(urls.map((url, id) => ({url, id})))
    } else {
        setPreviews([])
    }

  }, [setPreviews, setError])

  

    return (
        <div>
          <Button size="md" onClick={handleClick}>Upload Images</Button>
           <input className="hidden" 
            ref={hiddenFileInput}
            type="file" multiple 
            onChange={(e) => selectImagesHandler(e.target.files)} 
            accept=".png,.jpg,.jpeg"/>
        </div>
    )
    }
