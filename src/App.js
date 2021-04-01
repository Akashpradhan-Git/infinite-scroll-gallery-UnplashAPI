
import './App.css';
import Header from './components/Header'
import Loader from './components/Loader'
import axios from 'axios'

import InfiniteScroll from 'react-infinite-scroll-component';

import { useState, useEffect } from 'react';


function App() {

  const [image, setImage] = useState([])

  useEffect(() => {
    fetchData();
  }, [])

  function fetchData(count = 5) {
    const urls = "https://api.unsplash.com";
    const accessKey = 'D4CgYBoAdrt33PXrP9XMFb-V2FgcuflOCBogc19j_DA'

    axios
      .get(`${urls}/photos/random/?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        //console.log(res)
         setImage([...image, ...res.data])
      })
      .catch(e => console.log(e))
  }


  return (
    <section className="main">
      <Header />
      <div className="scroll">
      <InfiniteScroll
        dataLength={Image.length}
        next={fetchData}
        hasMore={true}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Hay! You have exceed the limit</b>
          </p>
        }
      >

        <div className="images">
          {image.map((im) => (
             //console.log(im.url)
            <img key={im.id} src={im.urls.thumb} className="single-photo"/>
          ))}
          
        </div>
      </InfiniteScroll>
      </div>

    </section>
  );
}

export default App;
