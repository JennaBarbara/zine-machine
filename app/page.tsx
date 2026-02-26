
"use client"

import Heading from "@/app/components/heading"
import Card from "@/app/components/card"
import Button from "@/app/components/button"
import { useCallback, useState } from "react"
import MultiImageUpload from "@/app/components/multi-image-upload"
import ToggleButtonGroup from "./components/toggle-button-group"
import NumberInput from "@/app/components/number-input"
import SubHeading from "@/app/components/sub-heading"
import { jsPDF } from "jspdf";
import NextImage from "next/image"
import SortableImageArea from "@/app/components/sortable-image"



const imageCoordinates = [
    { x: 2, y: 3, rotation: 90, adjustment: -1 }, //front
    { x: 2, y: 2, rotation: 90, adjustment: -1 }, //1
    { x: 2, y: 1, rotation: 90, adjustment: -1 }, //2
    { x: 0, y: 0, rotation: 270, adjustment: 1 }, //3
    { x: 0, y: 1, rotation: 270, adjustment: 1 }, //4
    { x: 0, y: 2, rotation: 270, adjustment: 1 }, //5
    { x: 0, y: 3, rotation: 270, adjustment: 1 }, //6
    { x: 2, y: 4, rotation: 90, adjustment: -1 }, //back
]

const pageFormats = [
    {value: 'letter', label: 'Letter'},
    {value: 'legal', label: 'Legal'},
    {value: 'tabloid', label: 'Tabloid'},
    {value: 'a4', label: 'A4'},
    {value: 'a5', label: 'A5'}

]

export default function ZineMachine() {

    const [previews, setPreviews] = useState<{url: string, id: number}[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [pageFormat, setPageFormat] = useState(pageFormats[0].value)
    const [topandBottomMargin, setTopandBottomMargin] = useState(0)
    const [sideMargin, setSideMargin] = useState(0)





    const generatePdfHandler = useCallback(async () => {
     setError(null)
     if (previews.length !== 8) {
         setError("You must upload exactly 8 images.");
         return;
        }
        setLoading(true)
        
    function loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
        });
    }

    async function normalizeImage(src: string): Promise<HTMLCanvasElement> {
        const img = await loadImage(src);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        return canvas;
    }
    
    
    const doc = new jsPDF({unit: 'mm',format: pageFormat});

    const panelHeight = doc.internal.pageSize.getWidth()/2;
    const panelWidth = doc.internal.pageSize.getHeight()/4;

    for (let i = 0; i < previews.length; i++) {
        const canvas = await normalizeImage(previews[i].url);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        

        const scale = Math.min(
                (panelWidth - sideMargin*2) / canvas.width, 
                (panelHeight - topandBottomMargin*2) / canvas.height
                );
        doc.addImage(imgData, 
             "JPEG",
            (imageCoordinates[i].x*panelHeight)+(imageCoordinates[i].adjustment*(panelHeight-(canvas.height*scale))/2),
            (imageCoordinates[i].y*panelWidth)-(canvas.height*scale)+(imageCoordinates[i].adjustment*(panelWidth-(canvas.width*scale))/2), 
            canvas.width*scale, 
            canvas.height*scale, 
            '', 
            'SLOW', 
            imageCoordinates[i].rotation);
    }


    doc.save("zine.pdf");
    setLoading(false)

   
}, [previews, setError, setLoading, pageFormat, topandBottomMargin, sideMargin])



  return (
 <>
    {/* header section */}
    <Heading text="8 Page Zine Machine" className="col-span-5" />

    {/* main section */}
        {/* right section */}
        <div className="col-span-5">
        <Card>
      
        <SubHeading text="Create Your Zine" />
        
         <MultiImageUpload setPreviews={setPreviews} setError={setError}/>
            <div className="flex flex-wrap gap-4 p-4 mb-2 border-2 border-slate-300 rounded-md min-h-32">
                {previews.length > 0 && <SortableImageArea previews={previews} setPreviews={setPreviews} />}
            {previews.length === 0 && <p className="text-gray-500">Your uploaded images will appear here to preview the page order.</p>}
            </div>
            <div className="flex flex-col gap-1">
            <span className="font-bold">Paper Size</span>
            <ToggleButtonGroup options={pageFormats} value={pageFormat} onChange={(value) => setPageFormat(value)} />
            </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">Margins Around Each Image</span>
                    <div className="flex flex-row gap-4">
                    <NumberInput label="Top and Bottom Margin (mm)" value={topandBottomMargin} onChange={setTopandBottomMargin} min={0} max={50} />
                    <NumberInput label="Side Margin (mm)" value={sideMargin} onChange={setSideMargin} min={0} max={50} />
                    </div>
                </div>
            <div className="flex flex-row-reverse items-center gap-2 mt-4">

                <Button size="md" onClick={()=>generatePdfHandler()} disabled={loading}>
                    <div className="flex flex-row items-center gap-2">
                        <span>Generate PDF</span>

                    {loading &&   <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 101 101">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="white"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="oklch(60.9% 0.126 221.723)"/>
                    </svg>}
                    </div>
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <SubHeading text="About" />
            <div className="flex flex-col gap-4">  
            <p>
                This is a tool to help you create a paper zine! Upload 8 images in the order you want them to appear in the zine, and then click &quot;Generate PDF&quot; to download a PDF of your zine. The first image will be the front cover, the next 6 images will be the inside pages, and the last image will be the back cover.
            </p>
            <p>
              Use the diagram below as a guide for folding your printed zine. 
            </p>
            <NextImage src="/zine-machine/zine-diagram.png" alt="diagram of how the pages will be arranged in the PDF" width={400} height={400} className="w-full h-auto object-contain"/>
        </div>
        </Card>
     </div>
  </>
  );
}
