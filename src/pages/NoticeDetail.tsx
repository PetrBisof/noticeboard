import useFetchState from "../hooks/useFetchState";
import CommentTile from "../components/bricks/CommentTile";
import { User, Post, Comment, Notation } from "../ts/interfaces";
import {
  useGetUsersQuery,
  useGetCommentsQuery,
  useGetPostsQuery,
} from "../features/notations-api/notationsApiSlice";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../components/bricks/Spinner";

const StyledContainer = styled.div`
  border: 1px solid #93291e;
  padding: 0px 12px;
  background: linear-gradient(to right, #93291e, #ed213a);
  margin: 0px 8%;
`;
const Title = styled.h2`
  color: #fff;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const CommentTitle = styled.h3`
  color: #fff;
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 72px;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const Description = styled.p`
  display: flex;
  flex-direction: column;
  color: #fff;
  font-weight: 300;
`;
const AuthorName = styled.p`
  color: #fff;
  font-weight: 500;
`;

const NoticeDetail = () => {
  const { id } = useParams();

  const users = useGetUsersQuery();
  const comments = useGetCommentsQuery();
  const posts = useGetPostsQuery();

  //hook decide if state of fetches is pending, error or fulfilled. For simplification in this small app is unified state for all three calls
  const fetchStatus = useFetchState([users, comments, posts]);

  let content = <div />;

  switch (fetchStatus) {
    case "pending":
      content = <Spinner />;
      break;
    case "fulfilled":
      if (posts.data) {
        const {
          title: noticeTitle,
          user: noticeUser,
          body,
          comments: noticeComments,
        } = prepareContent(
          posts.data,
          users.data,
          comments.data,
          parseInt(id || "")
        );
        content = (
          <StyledContainer>
            <Title>{noticeTitle}</Title>
            <AuthorName>{noticeUser}</AuthorName>
            <Description>{body}</Description>
            <CommentTitle>Comments:</CommentTitle>
            {noticeComments.map((comment) => (
              <CommentTile
                key={comment.id}
                title={comment.name}
                email={comment.email || ""}
                text={comment.body || ""}
              />
            ))}
          </StyledContainer>
        );
      }
      break;
    case "error":
      content = <span>Error occured</span>;
      break;
  }

  return content;
};

//Method prepars data for one notice
function prepareContent(
  posts: Post[],
  users: User[] = [],
  comments: Comment[] = [],
  id: number
): Notation {
  const notice = posts.find((post) => post.id === id);
  const user = users?.find((u) => u.id === notice?.userId);
  const noticeComments =
    comments && comments.filter((comment) => comment.postId === id);
  const userName = user?.name || "";
  return { ...notice, user: userName, comments: noticeComments };
}

export default NoticeDetail;
