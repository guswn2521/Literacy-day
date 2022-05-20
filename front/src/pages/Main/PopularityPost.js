import { useGetPostList } from "queries/postQuery";
import Loading from "components/Loading";
import PostCard from "pages/Post/PostCard";
import { useQueryClient } from "react-query";
import { GetMoreLink, PopularityPostContainer } from "styles/Main/MainStyle";
import { LABEL, URI } from "utils/constants";

function PopularityPost() {
  const queryClient = useQueryClient();
  const { userState, isLogin } = queryClient.getQueryData("userState");

  const { data, isLoading } = useGetPostList(`posts?${URI.SORT_LIKE}`);

  if (isLoading) return <Loading />;

  return (
    <section>
      <GetMoreLink to={`/posts?${URI.SORT_LIKE}`}>{LABEL.GET_MORE}</GetMoreLink>{" "}
      &nbsp;
      <PopularityPostContainer>
        {data.pages[0].posts.map((post) => (
          <PostCard
            key={post._id}
            userInfo={userState}
            isDisabled={isLogin}
            post={post}
          />
        ))}
      </PopularityPostContainer>
    </section>
  );
}

export default PopularityPost;
