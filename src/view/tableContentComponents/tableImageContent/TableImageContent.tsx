import React, { ReactElement } from 'react';
import { ImageContent } from '../../../model/types';


type Props = {
   imageContent: ImageContent,
};


function TableImageContent(props: Props): ReactElement {
   const { imageContent } = props;
   const { src, alt, width, height, title } = imageContent;

   return <img src={src} alt={alt} width={width} height={height} title={title} />;
}


export { TableImageContent };
