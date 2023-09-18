import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import axios from 'axios'
import Ratings from 'react-ratings-declarative';
import 'react-date-range/dist/styles.css'

import { Link } from 'react-router-dom'

import 'react-date-range/dist/theme/default.css'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import Slider from 'react-slick'
import Comments from '../components/Comments'
import { AuthContext } from '../context/AuthContext'

const Container = styled.div`
  margin-top: 30px;

  display: flex;

  width: 100vw;
`

const Left = styled.div`
  margin-left: 15px;
  display: flex;

  flex-direction: column;

  flex: 3;
`

const InfoElement = styled.div`
  //color: white;

  display: flex;
  align-items: center;
  border: 0.5px solid #fafeff;
  background-color: #fafeff;

  width: 220px;
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`

const Bottom = styled.div`
  margin-left: 63px;
  display: flex;
  flex-direction: column;
`

const LeftTop = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-around;
`

const CircleButton = styled.div`
  opacity: 0.5;
  margin: 0px 10px;

  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;

  cursor: pointer;

  border: 1px solid;
  align-items: center;

  border-radius: 3px;
`

const Right = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  flex: 1;
`

const HouseImg = styled.img`
  width: 63vw;
  height: 85vh;
  object-fit: cover;
`

const AllSmallImgContainer = styled.div`
  margin-left: 66px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`

const SmallImgContainer = styled.div`
  border: 3px solid blue;
  cursor: pointer;
  width: 90px;
  height: 90px;
  margin-left: 10px;
`

const SmalImg = styled.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
`

const Button = styled.button`
  border: none;

  background-color: red;
  color: white;
`

const SingleHouse = () => {
  const navigate = useNavigate()

  let [point,setPoint]=useState(0);
  const strToDate = (date) => {
    let [day, month, year] = date.split('.')
    return new Date(+year, +month - 1, +day)
  }

  const { id } = useParams()
  const location = useLocation()
  const houseId = location.pathname.split('/')[2]


  const [house, setHouse] = useState({})
  const [comment, setComment] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [openDateRange, setopenDateRange] = useState(false)
  
  let dateString = ['26.06.2023', '27.06.2023', '28.06.2023']
  
  const { user } = useContext(AuthContext)
 const  isRented=user!==null && house?.renters?.find(u=> u === user._id);
  let unavailableDates = []

console.log(user)

  useEffect(() => {
    const getHouse = async () => {
      const res = await axios.get(`http://localhost:8800/api/house/${houseId}`)
      
      if(res.data){
        setHouse(res.data)
       

      }

    }

    getHouse()
  }, [houseId])

  console.log(house.unAvailableDates  )
  console.log(comment)

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const getAlldates = () => {
    //  setAllDates([]);
    const date = new Date(dates[0].startDate)
    let m = []

    while (date <= dates[0].endDate) {
      m.push(new Date(date).toLocaleDateString())
      // setAllDates(prev =>([...prev,new Date(date)]))
      date.setDate(date.getDate() + 1)
    }
    m.join(',')

    return m

    //queryString="&searchDates="+m.join(",");
  }
  console.log(house)

  const sendComment= async() =>{
    const res = await axios.post(`http://localhost:8800/api/comment`,{rating:point,comment:comment,blogId:houseId,userId:user._id},  { withCredentials: true, credentials: 'include' })
  }

  const makePayment = () => {

    if(user===null){
      navigate("/login");
    }
    else{
      const reservationDates = getAlldates()

      navigate(`/makePayment/${id}`, { state: { dates: reservationDates,house:house } })
    }
   
  }

  console.log(unavailableDates)

  const arr = [
    'https://blog.turkishairlines.com/wp-content/uploads/2020/12/emine-valide-pasa-yalisi-1-1024x683.jpg.webp',

    'https://images.squarespace-cdn.com/content/v1/58412fc9b3db2b11ba9398df/774431e4-0d61-403b-a789-4793a26bd89e/Screen+Shot+2022-11-01+at+14.16.56.png?format=750w',
    'https://www.rodaonline.com/wp-content/uploads/C_IMG_miami_beach_21_20220330-1920x1152.jpg',
    'https://lh3.googleusercontent.com/1Ui7BaFZTxw91YYQr1JWs8hTo1N-yZasoinPmY4bCzBJH5vyLS6fIJHFO9miuqzluUlsku-blvOB9m31SkdTw8UKW123XgdgGFb6GEk=rw-w1440-h843-n-l60',
    'https://www.aftainsaat.com.tr/proje_sayfa/demo/img/yali/1.jpg',
    'https://images.trvl-media.com/lodging/67000000/66700000/66699300/66699268/39773ca7.jpg?impolicy=resizecrop&rw=1200&ra=fit',
  ]

  return (
    <Container>
      <Left>
        <LeftTop>
          <CircleButton
            onClick={() => {
              selectedIndex !== 0
                ? setSelectedIndex(selectedIndex - 1)
                : setSelectedIndex(house.photos?.length - 1)
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </CircleButton>

          <HouseImg src={house.photos?.[selectedIndex]} />

          <CircleButton
            onClick={() => {
              selectedIndex !== house.photos?.length - 1
                ? setSelectedIndex(selectedIndex + 1)
                : setSelectedIndex(0)
            }}
          >
            <ArrowForwardIosOutlinedIcon />
          </CircleButton>
        </LeftTop>
        <AllSmallImgContainer>
          {house.photos?.map((img, index) =>
            selectedIndex === index ? (
              <SmallImgContainer key={index}>
                <SmalImg src={img} />
              </SmallImgContainer>
            ) : (
              <SmallImgContainer
                onClick={() => {
                  setSelectedIndex(index)
                }}
                style={{ border: 'none' }}
                key={index}
              >
                <SmalImg src={img} />
              </SmallImgContainer>
            ),
          )}
        </AllSmallImgContainer>

        <Bottom>
          <h1>Istanbul Kadikoy ,Turkey | Beautifull House</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quasi
            suscipit quis voluptate aut consectetur, possimus unde fugit commodi
            omnis perferendis nesciunt tempora magni libero eius harum deserunt
            deleniti quaerat reprehenderit, et sit aliquam. Voluptatem cumque
            consectetur reprehenderit consequatur doloribus enim rem sapiente.
            Ex, aperiam laborum! Unde, et est deleniti id quod iste? Labore,
            commodi! Eveniet, perspiciatis unde culpa placeat tempore similique
            odio nulla accusantium quaerat molestiae quae, doloribus deleniti
            magnam. Dolorem cum, quaerat voluptatum et commodi reprehenderit,
            quam voluptatem obcaecati voluptas doloremque non assumenda! A
            tenetur doloribus aliquid consectetur ut voluptates error, minima
            nesciunt magni, non cumque, eaque quasi ducimus fuga explicabo
            obcaecati et ad quos. Iusto similique expedita illum aspernatur,
            debitis deleniti! Totam pariatur libero sint sequi laborum labore,
            odit ad possimus nemo saepe quis officiis. Similique velit magnam
            inventore voluptatum tempore sint repellat sunt expedita sit eos
            maiores cupiditate animi deserunt nemo, nihil odit. Corrupti, dolore
            cupiditate?
          </p>
         
          <Comments singlehouse={house} />
        </Bottom>
      </Left>
      <Right>
        <Info>
          <h1 style={{ fontSize: '8mm' }}>Info</h1>

          <InfoElement>
            <span>
              <strong>Country:</strong>{' '}
            </span>
            <span>Turkiye</span>
          </InfoElement>

          <InfoElement style={{ backgroundColor: 'white', border: 'none' }}>
            <span>
              <strong>City:</strong>{' '}
            </span>
            <span>Istanbul</span>
          </InfoElement>
          <InfoElement>
            <span>
              <strong>Town:</strong>{' '}
            </span>
            <span>Kadikoy</span>
          </InfoElement>
          <InfoElement style={{ backgroundColor: 'white', border: 'none' }}>
            <span>
              <strong>Phone:</strong>{' '}
            </span>
            <span>+905555555555</span>
          </InfoElement>

          <InfoElement>
            <span>
              <strong>Room:</strong>{' '}
            </span>
            <span>3</span>
          </InfoElement>
          <InfoElement style={{ backgroundColor: 'white', border: 'none' }}>
            <span>
              <strong>Saloon:</strong>{' '}
            </span>
            <span>1</span>
          </InfoElement>
          <InfoElement>
            <span>
              <strong>Bathroom:</strong>{' '}
            </span>
            <span>2</span>
          </InfoElement>
          <InfoElement style={{ backgroundColor: 'white', border: 'none' }}>
            <span>
              <strong>Garden:</strong>{' '}
            </span>
            <span>No</span>
          </InfoElement>
          <InfoElement>
            <span>
              <strong>Pool:</strong>{' '}
            </span>
            <span>No</span>
          </InfoElement>
          <InfoElement style={{ backgroundColor: 'white', border: 'none' }}>
            <span>
              <strong>Room:</strong>{' '}
            </span>
            <span>3</span>
          </InfoElement>
        </Info>

        {openDateRange ? (
          <div style={{ zIndex: '222', width: '380px' }}>
            <div
              style={{
                position: 'relative',
                marginTop: '10px',
                marginLeft: '10px',
              }}
            >
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: 0,
                  right: 18,
                  cursor: 'pointer',
                  zIndex: 2,
                  fontSize: '5mm',
                }}
                onClick={() => setopenDateRange(false)}
              >
                X
              </div>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                disabledDates={ house.unAvailableDates
                  .map((elem) => strToDate(elem))}
                minDate={new Date()}
              />
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  border: '1px solid white',
                  width: '180px',
                  borderRadius: '3px',
                  color: 'white',
                  height: '30px',
                  fontSize: '30px',
                  padding: '10px',
                  backgroundColor: 'red',
                }}
              >
                <Button>Add to Favorites </Button>
                <FavoriteBorderIcon />
              </div>

              <div
                onClick={() => setopenDateRange(true)}
                style={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  border: '1px solid white',
                  width: '180px',
                  borderRadius: '3px',
                  color: 'white',
                  height: '30px',
                  fontSize: '30px',
                  padding: '10px',
                  backgroundColor: 'blue',
                }}
              >
                <Button style={{ backgroundColor: 'blue' }}>
                  Select Dates{' '}
                </Button>
                <CalendarMonthOutlinedIcon />
              </div>

              <div
                style={{
                  display: 'flex',
                  cursor: 'pointer',
                  height: '10px',
                  alignItems: 'center',
                  border: '1px solid ',
                  width: '180px',
                  borderRadius: '3px',
                  color: 'white',
                  height: '30px',
                  fontSize: '30px',
                  padding: '10px',
                  backgroundColor: 'orange',
                }}
              >
                <Button
                  onClick={makePayment}
                  style={{ backgroundColor: 'orange' }}
                >
                  Make Resarvation{' '}
                </Button>
                <BorderColorOutlinedIcon />
              </div>
            </div>

            <span style={{ fontSize: '9mm' }}>$300 for night</span>
          </>
        )}
      </Right>
    </Container>
  )
}

export default SingleHouse
