const get_imageSrc = (state = '', action) => {
  switch (action.type) {
    case 'SET_IMAGESRC':
      return action.src;
    default:
      return state;
  }
}

export default get_imageSrc;
