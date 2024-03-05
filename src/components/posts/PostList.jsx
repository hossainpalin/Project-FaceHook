import PostCard from './PostCard';

export default function PostList({ posts }) {
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createAt) - new Date(a.createAt);
  });

  return (
    <>
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-center">No posts found</p>
      )}
    </>
  );
}
