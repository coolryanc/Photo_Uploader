/* action type */
const SET_IMAGESRC = 'SET_IMAGESRC';
const SET_FILTER = 'SET_FILTER';

/* action creator */
export const set_imageSrc = (src) => ({
  type: SET_IMAGESRC,
  src
});

export const set_filter = (id, val) => ({
  type: SET_FILTER,
  id,
  val
});
