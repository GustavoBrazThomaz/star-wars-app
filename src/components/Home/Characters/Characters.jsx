import { Card, CardContent, CircularProgress, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../../../hooks/API'

import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Characters() {

    const [id, setId] = useState(1)
    const [data, setData] = useState([])
    const [status, setStatus] = useState([])
    const [att, setAtt] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        API.get(`/people?page=${id}`).then(res => {
            if(res.status === 200)setRemoveLoading(true)
            setData(res.data.results)
            setStatus(res.status)
        })
        setAtt(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [att])

    const endSlider = () => {
        const pagina = id + 1
        if (pagina >= 9) setId(0)
        else {
            setId(pagina)
            setAtt(true)
        }
    }
    const card = { background: '#424242', margin: 5, width: 250 }
    return (
        <>
            {status === 200 &&
                <Swiper
                    style={{marginBottom: 40}}
                    modules={[Navigation, A11y]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                    onReachEnd={endSlider}
                    loopPreventsSlide={true}
                    loop={true}
                >
                    {data.map((res, index) => (
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