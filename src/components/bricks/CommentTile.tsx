import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 25px 12px 18px;
  border-bottom: 1px solid #80808090;
`;
const Title = styled.h2`
  color: #fff;
  font-weight: 300;
  font-size: 1.2rem;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const Description = styled.p`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

interface NoticeTileProps {
  title: string;
  text: string;
  email: string;
}

const CommentTile = ({ title, text, email }: NoticeTileProps) => {
  return (
    <StyledContainer>
      <Title>{title}</Title>
      <Description>{email}</Description>
      <Description>{text}</Description>
    </StyledContainer>
  );
};

export default CommentTile;
