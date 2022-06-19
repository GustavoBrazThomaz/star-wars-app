import React, { useEffect, useState } from 'react'

// Material
import { Alert, Button, Card, CardContent, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'

// API
import axios from 'axios'
import API from '../../hooks/API'

// Hooks
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// Swiper
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Css
import './Films.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Films() {

  // States
  const { id } = useParams()
  const [data, setData] = useState([])
  const [characters, setCharacters] = useState([])
  const [att, setAtt] = useState(false)
  const [test, setTest] = useState([])
  const [status, setStatus] = useState()
  const [removeLoading, setRemoveLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [statusCharacters, setStatusCharacters] = useState()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const [width, setWidth] = useState('')
  const [caractersCarousel , setCaractersCarousel] = useState(4)

  //Variaveis
  let characterList = []

  //Hooks 

  useEffect(() => {
    setWidth(window.screen.width)
    window.addEventListener('resize', updateWidth)
    if(width >= 1024){
      setCaractersCarousel(4)
    }
    if(width <= 1024){
      setCaractersCarousel(3)
    }
    if(width <= 678){
      setCaractersCarousel(2)
    }
  }, [width])

  useEffect(() => {
    API.get(`/films/${id}`).then(res => {
      if (res.status === 200) {
        setRemoveLoading(true)
        setData(res.data)
        document.title = res.data.title
        setStatus(res.status)
        setAtt(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let dataCharacters = data.characters

    if (dataCharacters !== undefined) {
      // eslint-disable-next-line array-callback-return
      dataCharacters.map((res) => {
        axios.get(res).then(res => {
          if (res.status === 200) {
            setStatusCharacters(res.status)
            setLoading(true)
            characterList.push(res.data)
            setCharacters(characterList)
          }
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [att])

  useEffect(() => {
    if (characters !== undefined) {
      setTest(characters)
    }
    setAtt(false)
  }, [characters])

  // Métodos

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  const onSubmit = (e) => {
    API.post('', e).then(res => console.log(res))
    console.log(e)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // React Css
  const card = { height: '100px', background: '#424242', margin: 5 }
  const formStyle = { background: '#424242', maxWidth: 800, paddingLeft: 50, paddingRight: 50, paddingBottom: 50, marginBottom: 30 }
  const inputStyle = { background: '#424242e7' }
  const titleStyle = { margin: 30 }

  return (
    <>
      {
        status === 200 &&
        <Container style={{ marginTop: 90, color: 'white' }}>
          <Typography variant='h4' align='center' style={titleStyle}>{data.title}</Typography><br />
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Description:</Typography>
              <Typography variant='h6'>{data.opening_crawl}</Typography><br />
              <Typography variant='h6'>Release Date: {data.release_date}</Typography><br />
              <Typography variant='h6'>Producer: {data.producer}</Typography><br />
              <Typography variant='h6'>Director: {data.director}</Typography><br />
            </Grid>
            <Grid item xs={12} md={6} align='center'>
              <img className='filmPoster' src={`/static/images/episode_${id}.png`} alt={data.title} />
            </Grid>
          </Grid>
          <Typography variant='h4' align='center' style={titleStyle}>Characters</Typography>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={50}
            slidesPerView={caractersCarousel}
            navigation
            loop={true}
          >
            {statusCharacters === 200 &&
              test.map((res, index) => (
                <SwiperSlide virtualIndex={index}>
                  <Card style={card}>
                    <CardContent style={{ color: 'white' }}>
                      <Typography>Name: {res.name}</Typography>
                      <Typography>Age: {res.birth_year}</Typography>
                      <Typography>Height: {res.height}</Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
          {!loading &&
            <Container align='center'>
              <CircularProgress color='primary' style={{ width: 80, height: 80 }} />
            </Container>
          }

          <Typography variant='h4' align='center' style={titleStyle}>Review</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container align='center'>
              <Card style={formStyle}>
                <Grid container spacing={2} style={{ marginTop: 30 }}>
                  <Grid item xs={12} md={6} >
                    <TextField style={inputStyle} fullWidth label='Name' variant="filled"  {...register('name', { required: true })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField style={inputStyle} fullWidth label='E-mail' variant="filled" type="email" {...register('email', { required: true })} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField style={inputStyle} fullWidth label='Your review' variant="filled" multiline rows={3} {...register('review', { required: true })} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" style={{ width: 200, color: 'black', fontWeight: 'bold' }} type="submit" color='primary' >Send to Us</Button>
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </form>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Review enviada com sucesso
            </Alert>
          </Snackbar>
        </Container>
      }
      {!removeLoading &&
        <Container align='center' style={{ display: 'flex', justifyContent: 'center', alignItens: 'center', marginTop: '50vh' }}>
          <CircularProgress color='primary' style={{ width: 80, height: 80 }} />
        </Container>
      }
    </>
  )
}

export default Films