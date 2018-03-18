import ic_sunny from './ic_sunny.svg';
import ic_contrast from './ic_contrast.svg';
import ic_invert from './ic_invert.svg';
import ic_palette from './ic_palette.svg';

export const defaultSetting = {
  'Brightness': '100',
  'Contrast': '100',
  'Saturate': '100',
  'Sepia': '0',
  'Grayscale': '0',
  'Invert': '0',
  // 'Blur': '0'
};

export const setting = [
  {
    name: 'Brightness',
    minVal: '0',
    maxVal: '200',
    defaultVal: '100',
    icon: ic_sunny,
  },
  {
    name: 'Contrast',
    minVal: '0',
    maxVal: '200',
    defaultVal: '100',
    icon: ic_contrast,
  },
  {
    name: 'Saturate',
    minVal: '0',
    maxVal: '200',
    defaultVal: '100',
    icon: ic_invert,
  },
  {
    name: 'Sepia',
    minVal: '0',
    maxVal: '100',
    defaultVal: '0',
    icon: ic_palette,
  },
  {
    name: 'Grayscale',
    minVal: '0',
    maxVal: '100',
    defaultVal: '0',
    icon: ic_palette,
  },
  {
    name: 'Invert',
    minVal: '0',
    maxVal: '100',
    defaultVal: '0',
    icon: ic_palette,
  },
  // {
  //   name: 'Blur',
  //   minVal: '0',
  //   maxVal: '5',
  //   defaultVal: '0',
  // },
];
