import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import API from '../../hooks/API'
import './Home.css'
import { Link } from 'react-router-dom';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Characters from './Characters/Characters'

function Home() {

  const [films, setFilms] = useState([])
  const [width, setWidth] = useState('')
  const [carousel, setCarousel] = useState(3)
  const [status, setStatus] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    API.get('/films').then(res => {
      if(res.status === 200)setRemoveLoading(true)
      setStatus(res.status)
      setFilms(res.data.results)
    })
  }, [])  

  useEffect(() => {
    setWidth(window.screen.width)
    window.addEventListener('resize', updateWidth)
    if(width >= 1024)setCarousel(3)
    if(width <= 1024)setCarousel(2)
    if(width <= 678)setCarousel(1)
  }, [width])

  const card = { height: '600px' ,background: '#424242', margin: 5, borderRadius: 30}
  return (
    <>
    {status === 200 &&
      <Container style={{ marginTop: 90 }}>
      <Typography style={{margin: 40}} variant='h4' color="primary" align='center'>Filmes</Typography>
      <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={carousel}
      navigation
      loop={true}
    >
          {films.map((res, index) => {
            const { director, producer, release_date, title, episode_id } = res
            return (
              <SwiperSlide key={episode_id} virtualIndex={index}>
                    <Card style={card}>
                    <CardMedia
                      component="img"
                      image={`/static/images/episode_${episode_id}.png`}
                      height={390}
                      alt={title}
                    />
                    <CardContent style={{ color: 'white', height: 120 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {title}
                      </Typography>
                      <Typography variant="body2">
                        Data de Lançamento: {release_date}<br />
                        Produtor: {producer}<br />
                        Director: {director}
                      </Typography>
                    </CardContent>
                    <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                      <Button variant="contained" color="primary" size="small"><Link style={{ textDecoration: 'none'}} to={`/Filmes/${episode_id}`}>Ver Detalhes</Link></Button>
                    </CardActions>
                  </Card>
              </SwiperSlide>
            )})
            }
       </Swiper>
       <Typography style={{margin: 40}} variant='h4' color="primary" align='center'>Personagens</Typography>
            <Characters/>
      </Container>
    }
      {!removeLoading && 
      <Container align='center' style={{display: 'flex', justifyContent: 'center', alignItens: 'center', marginTop: '50vh'}}>
        <CircularProgress color='primary' style={{width: 80, height: 80}}/>
      </Container>
      }
    </>
  )
}

export default Home