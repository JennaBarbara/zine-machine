
import { useCallback} from "react"

interface MultiImageUploadProps {
setPreviews: (urls: {url: string, id: number}[]) => void
     setError: (error: string | null) => void
}

export default function MultiImageUpload({ setPreviews, setError}: MultiImageUploadProps) {
   const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

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
       
        {/* Implement your multi-image upload functionality here */}
           <input className="file:bg-radial-[at_25%_25%] file:from-stone-100 file:to-stone-200 file:via-stone-300 hover:file:bg-stone-100 file:p-4 file:cursor-pointer  z-50 outline-2 outline-stone-500 rounded-md bg-radial-[at_25%_25%] bg-slate-100  disabled:opacity-50" 
            id="multiple_files" 
            type="file" multiple 
            onChange={(e) => selectImagesHandler(e.target.files)} 
            accept=".png,.jpg,.jpeg"/>
        </div>
    )
    }
