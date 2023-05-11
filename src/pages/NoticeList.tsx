import Spinner from "../components/bricks/Spinner";
import useFetchState from "../hooks/useFetchState";
import {
  useGetUsersQuery,
  useGetCommentsQuery,
  useGetPostsQuery,
} from "../features/notations-api/notationsApiSlice";
import NoticeTile from "../components/bricks/NoticeTile";
import styled from "styled-components";
import { User, Post, Comment } from "../ts/interfaces";

const StyledContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  gridAutoFlow: "dense",
  gridGap: "3rem",
  margin: "3rem",
});

const NoticeList = () => {
  const users = useGetUsersQuery();
  const comments = useGetCommentsQuery();
  const posts = useGetPostsQuery();
  const fetchStatus = useFetchState([users, comments, posts]);
  let content = <div />;
  switch (fetchStatus) {
    case "pending":
      content = <Spinner />;
      break;
    case "fulfilled":
      if (posts.data) {
        const preparedContent = prepareContent(
          posts.data,
          users.data || [],
          comments.data || []
        );
        content = (
          <StyledContainer>
            {preparedContent.map((notice) => (
              <NoticeTile
                key={notice.id}
                title={notice.title || ""}
                user={notice.user}
                body={notice.body || ""}
                id={notice.id}
                comments={notice.comments || []}
              />
            ))}
          </StyledContainer>
        );
      }
      break;
    case "error":
      content = <span>Error occured</span>;
      break;
    default:
      <span>Error occured</span>;
  }
  return content;
};

export default NoticeList;

//Method prepars data for notices by merging of needed data from posts, users and comments
function prepareContent(posts: Post[], users: User[], comments: Comment[]) {
  return posts.map((post) => {
    const user = users.find((u) => u.id === post.userId);
    const postComments: Comment[] = [];
    comments.forEach((comment) => {
      if (comment.postId === post.id) {
        postComments.push(comment);
      }
    });
    const userName = user?.name || "";
    return { ...post, user: userName, comments: postComments };
  });
}
