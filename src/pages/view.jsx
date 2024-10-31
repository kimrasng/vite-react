import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { Share2, Copy, Check } from 'lucide-react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`

const Card = styled.div`
  width: 212px;
  height: fit-content;
  padding: 20px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0px 4px 15px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const UserName = styled.h3`
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  margin-left: 6px;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 16px auto;
  object-fit: cover;
  border-radius: 50%;
`

const ContentText = styled.p`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  text-align: center;
`

const ShareSection = styled.div`
  border-top: 1px solid #eaeaea;
  padding-top: 24px;
  margin-top: 24px;
`

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #3b82f6;
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }
`

const QRCodeContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  width: fit-content;
  margin: 16px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const CopyButton = styled(ShareButton)`
  margin-top: 12px;
`

const View = () => {
    const [copied, setCopied] = useState(false);
    const [isShareVisible, setIsShareVisible] = useState(false);
    const { search } = useLocation()
    const currentUrl = window.location.href;
    
    const params = new URLSearchParams(search)
    const name = params.get('name')
    const phone = params.get('phone')
    const email = params.get('email')
    const imageUrl = params.get('image')

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Container>
            <Card>
                <UserName>{name || '이름 없음'}</UserName>
                
                {imageUrl && (
                    <ProfileImage 
                        src={imageUrl} 
                        alt="프로필"
                    />
                )}
                
                <ContentText>TELL : {phone || '전화번호 없음'}</ContentText>
                <ContentText>EMAIL : {email || '이메일 없음'}</ContentText>

                <ShareSection>
                    <ShareButton onClick={() => setIsShareVisible(!isShareVisible)}>
                        <Share2 size={20} />
                        <span>명함 공유하기</span>
                    </ShareButton>

                    {isShareVisible && (
                        <>
                            <QRCodeContainer>
                                <QRCode 
                                    value={currentUrl}
                                    size={256}
                                    style={{ height: "180px", width: "180px" }}
                                    viewBox={`0 0 256 256`}
                                    level="H"
                                />
                            </QRCodeContainer>

                            <CopyButton onClick={handleCopyLink}>
                                {copied ? (
                                    <>
                                        <Check size={20} />
                                        <span>복사 완료!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={20} />
                                        <span>링크 복사하기</span>
                                    </>
                                )}
                            </CopyButton>
                        </>
                    )}
                </ShareSection>
            </Card>
        </Container>
    );
};

export default View;