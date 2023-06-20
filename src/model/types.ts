type ContentType = 'title' | 'text' | 'image';


type ColumnAlignmentOption = 'left' | 'right' | 'center';


type LinkTargetOption = '_blank' | '_parent';


type TablePosition = {
   rowIndex: number,
   columnIndex: number
};


type TitleContent = {
   type: 'title',
   title: string,
   columnAlignment: ColumnAlignmentOption
};


type TextContent = {
   type: 'text',
   text: string
};


type ImageContent = {
   type: 'image',
   src: string,
   alt: string,
   width: string,
   height: string,
   title?: string
};


type TableContent = TitleContent | TextContent | ImageContent | null;


type ImageContentUpdate = {
   key: 'src' | 'alt' | 'width' | 'height' | 'title',
   value: string
};


export {
   ContentType,
   ColumnAlignmentOption,
   LinkTargetOption,
   TablePosition,
   TitleContent,
   TextContent,
   ImageContent,
   TableContent,
   ImageContentUpdate
};
