const updatePost = async (updatedPost) => {
  const { id, ...data } = updatedPost;
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
  return response.data;
};

const UpdatePost = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const queryClient = useQueryClient();

  const mutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts'); // Refetch posts after an update
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ id: post.id, title, body });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
};
