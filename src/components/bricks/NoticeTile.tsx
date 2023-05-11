import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { VscCommentDiscussion, VscInfo } from "react-icons/vsc";
import useWindowSize from "../../hooks/useWindowSize";
import { ModalPositionX, ModalPositionY } from "../../ts/interfaces";
import { Comment } from "../../ts/interfaces";

import Modal from "./Modal";

export interface DescriptionProps {
  lines: number;
}

export interface ModalConfig {
  title: string;
  showHeader: boolean;
  positionX: ModalPositionX;
  positionY: ModalPositionY;
  padding: string;
  showOverlay: boolean;
}

export const CONFIG: ModalConfig = {
  title: "Modal Header 1",
  showHeader: true,
  showOverlay: true,
  positionX: ModalPositionX.center,
  positionY: ModalPositionY.center,
  padding: "20px",
};

const StyledContainer = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 0px 12px 33px;
  background: linear-gradient(to right, #93291e, #ed213a);
`;

const StyledCommentsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  gap: 0.5rem;
}
`;
const Title = styled.h2`
  color: #fff;
  font-weight: 300;
  height: 36px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommentWrapper = styled.div`
  border-bottom: 1px solid #80808063;
  margin: 12px 0px;
`;
const Description = styled.p<DescriptionProps>`
  display: flex;
  flex-direction: column;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => p.lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffcbd7;
`;

const Action = styled.button`
  margin: 0 5px;
  padding: 8px 14px;
  background: rgba(155, 155, 155, 0.2);
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  outline: 0;
  font-weight: 300;
  :hover {
    opacity: 0.7;
    border: 1px solid #a39fa0;
    color: white;
  }
  :active {
    background: red;
    border: white;
    outline: none;
  }
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

interface NoticeTileProps {
  title: string;
  user: string;
  body: string;
  id: number;
  comments: Comment[];
}

const NoticeTile = ({ title, user, body, comments, id }: NoticeTileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  //on small screensizes are comments rendered under the tile, on bigger screens into modal window
  const screenSize = useWindowSize();
  useEffect(() => {
    setIsOpen(false);
  }, [screenSize]);

  return (
    <div>
      <StyledContainer>
        <Title>{title}</Title>
        <Description lines={2}>{user}</Description>
        <Description lines={2}>{body}</Description>
        <Action onClick={() => setIsOpen((prevState) => !prevState)}>
          <StyledCommentsContainer>
            <Description lines={2}>{comments.length}</Description>
            <span>Show comments</span>
            <VscCommentDiscussion />
          </StyledCommentsContainer>
        </Action>
        <NavLink to={`/productDetail/${id}`}>
          <Action>
            <StyledCommentsContainer>
              <span>More info...</span>
              <VscInfo />
            </StyledCommentsContainer>
          </Action>
        </NavLink>
        {screenSize === "m" && isOpen && (
          <Description lines={100}>
            {comments.map((comment: Comment) => (
              <CommentWrapper key={comment.id}>
                From {comment.email}
                <br />
                {comment.body}
              </CommentWrapper>
            ))}
          </Description>
        )}
      </StyledContainer>
      {screenSize !== "m" && (
        <Modal
          show={isOpen}
          config={{ ...CONFIG, title: `Comments for notice ${title}` }}
          setShow={() => setIsOpen(false)}
        >
          <div>
            {comments.map((comment: Comment) => (
              <CommentWrapper key={comment.id}>
                From {comment.email}
                <br />
                {comment.body}
              </CommentWrapper>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NoticeTile;
