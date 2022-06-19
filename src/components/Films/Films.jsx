import { Alert, Button, Card, CardContent, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../hooks/API'
import './Films.css'

import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios'
import { useForm } from 'react-hook-form'

function Films() {

  const { id } = useParams()
  const [data, setData] = useState([])
  const [characters, setCharacters] = useState([])
  const [att, setAtt] = useState(false)
  const [test, setTest] = useState([])
  const [status, setStatus] = useState()
  const [removeLoading, setRemoveLoading] = useState(false)
  const [open, setOpen] = useState(false);
  let array = []

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    API.get(`/films/${id}`).then(res => {
      if (res.status === 200) {
        setRemoveLoading(true)
        setData(res.data)
        setStatus(res.status)
        setAtt(true)
      }
    }).catch(error => console.error(error))
  }, [])

  useEffect(() => {
    let dataCharacters = data.characters

    if (dataCharacters !== undefined) {
      dataCharacters.map((res) => {
        axios.get(res).then(res => {
          array.push(res.data)
          setCharacters(array)
        })
      })
    } else {
      console.log('esperando', dataCharacters)
    }
  }, [att])

  useEffect(() => {
    if (characters !== undefined) {
      setTest(characters)
    }
  }, [characters])

  const onSubmit = (e) => {
    localStorage.setItem('Reviews', JSON.stringify(e))
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
            <Typography variant='h6'>Descrição:</Typography>
            <Typography variant='h6'>{data.opening_crawl}</Typography><br />
            <Typography variant='h6'>Data de Lançamento: {data.release_date}</Typography><br />
            <Typography variant='h6'>Produtor: {data.producer}</Typography><br />
            <Typography variant='h6'>Diretor: {data.director}</Typography><br />
          </Grid>
          <Grid item xs={12} md={6} align='center'>
            <img className='filmPoster' src={`/static/images/episode_${id}.png`} alt={data.title} />
          </Grid>
        </Grid>
          <Typography variant='h4' align='center' style={titleStyle}>Characters</Typography>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          loop={true}
        >
          {
          test.map((res, index) => (
            <SwiperSlide virtualIndex={index}>
              <Card style={card}>
                <CardContent style={{ color: 'white' }}>
                  <Typography>Nome: {res.name}</Typography>
                  <Typography>Idade: {res.birth_year}</Typography>
                  <Typography>Altura: {res.height}</Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <Typography variant='h4' align='center' style={titleStyle}>Review</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container align='center'>
            <Card style={formStyle}>
            <Grid container spacing={2} style={{marginTop: 30}}>
              <Grid item xs={12} md={6} >
                <TextField style={inputStyle} fullWidth label='nome' variant="filled"  {...register('name', { required: true })} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField style={inputStyle} fullWidth label='email' variant="filled"  type="email" {...register('email', { required: true })} />
              </Grid>
              <Grid item xs={12}>
                <TextField style={inputStyle} fullWidth label='Review' variant="filled"  multiline rows={3} {...register('review', { required: true })} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" style={{width: 200, color: 'black', fontWeight: 'bold'}} type="submit" color='primary' >Submit</Button>
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