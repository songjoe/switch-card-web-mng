/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:27:18
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import Zmage from 'react-zmage';

import { IViewImageProps } from '@/types';

const ViewImage = (props: IViewImageProps) => {
  const { img, alt = '图片', set, index } = props;
  const setValue = set.map((img: string, index: number) => ({
    src: img,
    alt: set.length > 0 ? `${alt}-${index}` : alt
  }))
  return (
    <Zmage
      src={img}
      alt={alt}
      set={setValue}
      defaultPage={index}
    />
  )
}

export default ViewImage;