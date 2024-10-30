import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import defaultProfile from '../assets/react.svg'

const Container = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    color: #ffffff;
`

const InputContainer = styled.div`
    width: 100%;
    border-radius: 8px;
    border: 1px solid #444;
    padding: 10px 0px;
    margin-bottom: 10px;
    background-color: #2b2b2b;
`

const InputText = styled.input`
    width: 100%;
    font-size: 16px;
    border: 0;
    outline: none;
    color: #ffffff;
    background-color: transparent;

    &::placeholder {
        color: #c9c4c4;
    }
`

const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`

const PreviewCard = styled.div`
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #444;
    border-radius: 8px;
    background-color: #2b2b2b;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    text-align: center;
`

const PreviewImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 4px;
`

function Add() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImageUrl(URL.createObjectURL(file))
        } else {
            setImageUrl(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name && phone && email) {
            const finalImageUrl = imageUrl || defaultProfile
            const query = new URLSearchParams({ name, phone, email, image: finalImageUrl }).toString()
            navigate(`/view?${query}`)
        }
    }

    return (
        <Container>
            <h2>명함 만들기</h2>
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <InputText
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름"
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <InputText
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="전화번호"
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <InputText
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <InputText
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </InputContainer>
                <Button type="submit">명함 공유하기</Button>
            </form>
            <h2>명함 미리보기</h2>
            <PreviewCard>
                <h3>{name || '이름 미리보기'}</h3>
                <PreviewImage src={imageUrl || defaultProfile} alt="명함 미리보기" />
                <p>{phone || '전화번호 미리보기'}</p>
                <p>{email || '이메일 미리보기'}</p>
            </PreviewCard>
        </Container>
    )
}

export default Add