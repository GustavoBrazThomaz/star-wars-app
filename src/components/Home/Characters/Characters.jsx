import React, { useEffect, useState } from 'react'

// Material 
import { Card, CardContent, CircularProgress, Container, Typography } from '@mui/material'

// API
import API from '../../../hooks/API'

// Swiper
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper Css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Characters({caractersCarousel}) {
    
    // States
    const [id, setId] = useState(1)
    const [data, setData] = useState([])
    const [status, setStatus] = useState([])
    const [att, setAtt] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)

    // Hooks
    useEffect(() => {
        API.get(`/people?page=${id}`).then(res => {
            if(res.status === 200)setRemoveLoading(true)
            setData(res.data.results)
            setStatus(res.status)
        })
        setAtt(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [att])

    // Métodos
    const endSlider = () => {
        const pagina = id + 1
        if (pagina >= 9) setId(0)
        else {
            setId(pagina)
            setAtt(true)
        }
    }

    // React css
    const card = { background: '#424242', margin: 5, width: 240 }

    return (
        <>
            {status === 200 &&
                <Swiper
                    style={{marginBottom: 40}}
                    modules={[Navigation, A11y]}
                    spaceBetween={50}
                    slidesPerView={caractersCarousel}
                    navigation
                    onReachEnd={endSlider}
                    loopPreventsSlide={true}
                    loop={true}
                >
                    {data.map((res, index) => (
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
            }
            {!removeLoading &&
                <Container align='center' style={{ display: 'flex', justifyContent: 'center', alignItens: 'center'}}>
                    <CircularProgress color='primary' style={{ width: 80, height: 80, marginBottom: 40 }} />
                </Container>
            }
        </>
    )
}

export default Characters