import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image"


export default function SortableImageArea({ previews, setPreviews }: { previews:{url: string, id: number}[], setPreviews: React.Dispatch<React.SetStateAction<{url: string, id: number}[]>> }) {
    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPreviews((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
    });
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            >
                <SortableContext items={previews.map((p) => p.id)} strategy={rectSortingStrategy}>
                    <div className="flex gap-2 flex-wrap touch-none">
                    {previews.map((preview, index) => (
                        <SortableImage key={preview.id} preview={preview} index={index} />
                    ))}
                    </div>
                </SortableContext>
        </DndContext>
    )
}
function SortableImage({ preview, index }: { preview: {url: string, id: number}; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: preview.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative cursor-grab">
      <Image
        src={preview.url}
        alt={`Preview ${index}`}
        width={128}
        height={128}
        className="w-32 max-h-32 object-contain touch-none"
      />
      <span className="absolute top-0 left-0 m-1 bg-white text-xs px-1 rounded-full border border-black">
        {index + 1}
      </span>
    </div>
  );
}