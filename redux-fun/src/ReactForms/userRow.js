import { useMutation } from "@apollo/client";
import { deleteUser } from "../graphql/userMutation";
import { getUsers } from "../graphql/usersQuery";

export default function userRow({ User, sno }) {
  const [deleteUserById] = new useMutation(deleteUser, {
    variables: { id: User.id },
    refetchQueries: [{ query: getUsers }],
    // update(cache, { data: { deleteUser } }) {
    //   const { clients } = cache.readQuery({ query: getUsers });
    //   cache.writeQuery({
    //     query: getUsers,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteUserById.id),
    //     },
    //   });
    // },
  });
  return (
    <tr>
      <td>{sno + 1}</td>
      <td>{User.name}</td>
      <td>{User.email}</td>
      <td>
        <button className="btn btn-danger btn sm" onClick={deleteUserById}>
          Delete
        </button>
      </td>
    </tr>
  );
}
