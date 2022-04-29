import { paths } from '@reservoir0x/client-sdk'
import { optimizeImage } from 'lib/optmizeImage'
import React, { FC } from 'react'
import Image, { ImageLoaderProps } from 'next/image'

type Props = {
  sample_images: NonNullable<
    paths['/collections/{collection}/attributes/explore/v2']['get']['responses']['200']['schema']['attributes']
  >[0]['sampleImages']
  value: NonNullable<
    paths['/collections/{collection}/attributes/explore/v2']['get']['responses']['200']['schema']['attributes']
  >[0]['value']
}

const imageLoader = (props: ImageLoaderProps) => {
  return optimizeImage(props.src, props.width)
}

const ImagesGrid: FC<Props> = ({ sample_images, value }) => {
  return (
    <>
      {!!sample_images && sample_images.length > 0 ? (
        <div className="grid grid-cols-[1fr_1fr_25%] items-center gap-1.5">
          <div className="relative col-span-2 h-full w-full rounded">
            {sample_images.length > 1 ? (
              // SMALLER IMAGE, HAS SIDE IMAGES
              <Image
                loader={imageLoader}
                src={sample_images[0]}
                alt="Image Grid Image"
                layout="fill"
                width={224}
              />
            ) : (
              // BIG IMAGE, NO SIDE IMAGES
              <Image
                loader={imageLoader}
                src={sample_images[0]}
                alt="Image Grid Image"
                width={300}
                height={300}
              />
            )}
          </div>
          {sample_images.length > 1 && (
            <div className="flex h-full flex-col gap-1">
              {sample_images.slice(1).map((image, i) => (
                <Image
                  key={`${image}_${i}`}
                  loader={imageLoader}
                  src={image}
                  alt={`Image ${i}`}
                  className="w-[70px] rounded"
                  width={70}
                  height={70}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-w-1 aspect-h-1 relative">
          <img
            src="https://via.placeholder.com/250"
            width="250"
            height="250"
            alt="Loading"
          />
        </div>
      )}
    </>
  )
}

export default ImagesGrid
