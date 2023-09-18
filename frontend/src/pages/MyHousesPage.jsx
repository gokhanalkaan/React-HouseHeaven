import React, { useContext, useState } from 'react'
import { Badge } from '@mui/material'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const Container = styled.div`
  width: 100%;

  height: 100%;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 1080px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Row = styled.tr`
  &:nth-child(even) {
    background-color: #d6eeee;
  }
`

const Houses = styled.div``

const Top = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const SmPhoto = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
`

const Button = styled.button`
  background-color: blue;
  height: 40px;
  width: 100px;
  color: white;
  cursor: pointer;
`
const MyHousesPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [houses, setHouses] = useState([])
  useEffect(() => {
    const getHouse = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/house/myAllHouses/${user._id}`,
        { withCredentials: true, credentials: 'include' },
      )
      setHouses(res.data)
      console.log(res.data)
    }

    getHouse()
  }, [])

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>See Your Houses</h1>

          <Link
            to={'/addNewHouse'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button>Add House +</Button>
          </Link>
        </Top>

        <Houses>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Row style={{ textAlign: 'left' }}>
              <th>Id</th>
              <th>Photo</th>
              <th>Title</th>
              <th>Price</th>
              <th>Operations</th>
            </Row>

            {houses.map((house) => (
              <Row style={{ textAlign: 'left', padding: '8px' }}>
                <td>{house._id}</td>

                <td>
                  <SmPhoto src={house.photos?.[0]}></SmPhoto>
                </td>
                <td>{house.title}</td>

                <td>{'$' + house.price}</td>

                <td>
                  <Button
                    style={{ backgroundColor: 'orange', width: '60px' }}
                    onClick={() =>
                      navigate('/editHouse', { state: { house: house } })
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    style={{
                      backgroundColor: 'red',
                      marginLeft: '5px',
                      width: '60px',
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </Row>
            ))}

           
          </table>
        </Houses>
      </Wrapper>
    </Container>
  )
}

export default MyHousesPage
