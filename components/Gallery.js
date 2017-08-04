import React from 'react'

export default class extends React.Component {
  render () {
    const {title, images, ...props} = this.props
    const orderedImages = [].concat(images).reverse()

    return <a role='button' className='gallery-item' {...props}>
      {orderedImages.map((image, index) =>
        <img src={`/static${image}`} key={image}
          style={{transform: `translate3d(${(images.length - index) * 5}px, 0, ${(images.length - index) * -2}px) rotateY(-5deg)`}}
        />
      )}
      <style jsx>{`
        .gallery-item {
          display: block;
          position: relative;
          perspective: 50vw;
          margin: 10%;
          height: 0;
          padding-top: 50.2%;
          cursor: pointer;
        }

        img {
          border: 1px solid #1a1a1a;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
      `}
      </style>
    </a>
  }
}
