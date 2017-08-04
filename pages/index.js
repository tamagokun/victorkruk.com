import { Component } from 'react'
import Head from 'next/head'
import Gallery from '../components/Gallery'
import Transition from 'react-motion-ui-pack'
import { spring } from 'react-motion'
import Lightbox from 'react-images'

const galleries = [
  {
    title: 'Custom Hot Rod',
    images: [
      '/images/hotrod/1.jpg',
      '/images/hotrod/2.jpg'
    ]
  },
  {
    title: 'Lighting',
    images: [
      '/images/lighting/1.jpg',
      '/images/lighting/2.jpg'
    ]
  },
  {
    title: 'Mobile Projector',
    images: [
      '/images/projector/1.jpg',
      '/images/projector/2.jpg',
      '/images/projector/3.jpg',
      '/images/projector/4.jpg',
      '/images/projector/5.jpg',
      '/images/projector/6.jpg'
    ]
  },
  {
    title: 'Snow Removal Truck',
    images: [
      '/images/snowtruck/1.jpg',
      '/images/snowtruck/2.jpg',
      '/images/snowtruck/3.jpg',
      '/images/snowtruck/4.jpg',
      '/images/snowtruck/5.jpg'
    ]
  }
]

export default class extends Component {
  state = {
    open: false,
    currentImage: 0,
    images: []
  }

  onClickGallery = (gallery, e) => {
    e.preventDefault()
    const images = gallery.images.map(path => {
      return {src: `/static${path}`}
    })
    this.setState(prevState => ({open: true, current: 0, images}))
  }

  onPrevImage = () => {
    this.setState(prevState => ({current: prevState.current - 1}))
  }

  onNextImage = () => {
    this.setState(prevState => ({current: prevState.current + 1}))
  }

  render () {
    return <div className='app'>
      <Head>
        <meta charSet='utf-8' />
        <title>Victor Kruk | Industrial Product Design</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className='details'>
        <div className='info'>
          <h1>Victor Kruk</h1>
          <h2>Industrial Product Design</h2>
          <p>
            <a href='mailto:victor.kruk7@gmail.com'>victor.kruk7@gmail.com</a>
          </p>
          <h4>Services</h4>
          <ul>
            <li>concept sketching and development</li>
            <li>product illustration</li>
            <li>detail drawings</li>
            <li>surface / engineering direction</li>
            <li>production design direction</li>
          </ul>
        </div>
      </div>
      <div className='gallery'>
        <Transition
          enter={{
            opacity: 1,
            scale: 1,
            translateY: spring(0, {stiffness: 200, daming: 10})
          }}
          leave={{
            opacity: 0,
            scale: 1.5,
            translateY: 250
          }}
        >
          {galleries.map((gallery, index) =>
            <Gallery key={index} {...gallery}
              onClick={this.onClickGallery.bind(null, gallery)} />
          )}
        </Transition>
      </div>
      <Lightbox
        images={this.state.images}
        currentImage={this.state.current}
        isOpen={this.state.open}
        onClickPrev={this.onPrevImage}
        onClickNext={this.onNextImage}
        onClose={() => this.setState({open: false})}
        backdropClosesModal
      />
      <style jsx global>{`
        body {
          color: #484848;
          font-family: Helvetica;
          margin: 0;
        }

        .details {
          position: relative;
          min-height: 66vh;
        }

        .info {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 10%;
        }

        .gallery {
          background: #f5f2f4;
          position: relative;
          padding: 10px 0;
        }

        a:link, a:visited {
          color: #6200F6;
          text-decoration: none;
        }

        @media (min-width: 768px) {
          .details {
            position: fixed;
            left: 0;
            top: 0;
            width: 50%;
            height: 100vh;
          }

          .gallery {
            left: 50%;
            top: 0;
            min-height: 100vh;
            width: 50%;
            overflow-y: scroll;
          }
        }
      `}</style>
    </div>
  }
}
