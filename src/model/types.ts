type ContentType = 'title' | 'text' | 'image' | 'link';


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
};


type LinkContent = {
   type: 'link',
   href: string,
   target: LinkTargetOption,
   content: TextContent | ImageContent
};


export {
   ContentType,
   ColumnAlignmentOption,
   LinkTargetOption,
   TablePosition,
   TitleContent,
   TextContent,
   ImageContent,
   LinkContent
};
