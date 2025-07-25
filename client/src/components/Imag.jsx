import { Image } from '@imagekit/react';

const Imag = ({src, className, w, h, alt}) => {
  return (
    <Image
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        lqip={{ active: true, quality: 20 }}
        width={w}
        height={h}
        transformation={[
          {
            width: w,
            height: h,
          }
        ]}
    />
  )
}

export default Imag