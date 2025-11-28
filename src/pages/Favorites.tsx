import NothingFound from "../components/NothingFound";
import Posts from "../components/Posts";
import { useAppSelector } from "../redux/store";

export default function Favorites() {
  const { favoritePosts } = useAppSelector((state) => state.posts);

  return (
    <>
      {favoritePosts.length === 0 ? (
        <NothingFound text={"Nothing added to favorites"} />
      ) : (
        <Posts data={favoritePosts} isLoading={false} columns={"2"} />
      )}
    </>
  );
}


// data - смотри компонет Posts
