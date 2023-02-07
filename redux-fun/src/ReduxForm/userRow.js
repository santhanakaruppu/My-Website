import { useMutation } from "@apollo/client";
import { deleteUser } from "../graphql/userMutation";
import { getUsers } from "../graphql/usersQuery";
import { useNavigate } from "react-router-dom";
export default function userRow({ User, sno }) {
  const navigate = new useNavigate();

  const [deleteUserById] = new useMutation(deleteUser, {
    variables: { id: User.id },
    refetchQueries: [{ query: getUsers }],
  });

  const EditUser = () => {
    navigate(`/edituser/${User.id}`, { state: User });
  };
  return (
    <tr>
      <td>{sno + 1}</td>
      <td>{User.name}</td>
      <td>{User.email}</td>
      <td>
        <button className="btn btn-primary btn sm" onClick={EditUser}>
          Edit
        </button>
      </td>
      <td>
        <button className="btn btn-danger btn sm" onClick={deleteUserById}>
          Delete
        </button>
      </td>
    </tr>
  );
}
