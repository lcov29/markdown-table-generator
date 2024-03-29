type ContentType = 'title' | 'text' | 'image';


type ColumnAlignmentOption = 'left' | 'right' | 'center';


type LinkTargetOption = '_blank' | '_parent' | '';


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
   text: string,
   isLink: boolean,
   href: string,
   target: LinkTargetOption,
   title: string
};


type ImageContent = {
   type: 'image',
   src: string,
   alt: string,
   width: string,
   height: string,
   title: string,
   isLink: boolean,
   href: string,
   target: LinkTargetOption
};


type TableContent = TitleContent | TextContent | ImageContent | null;


export {
   ContentType,
   ColumnAlignmentOption,
   LinkTargetOption,
   TablePosition,
   TitleContent,
   TextContent,
   ImageContent,
   TableContent
};
