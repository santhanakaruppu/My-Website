import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import { getUsers } from "../graphql/usersQuery";
import UserRow from "./userRow";

// import DeleteUserById from "./deleteUser";
export default function Users() {
  const { loading, error, data } = useQuery(getUsers);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  console.log(data);

  return (
    <>
      {!loading && !error && (
        <div className="table table-hove mt-3">
          <Table responsive>
            <thead>
              <tr>
                <th>SNO</th>
                <th>UserName</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user, i) => (
                <UserRow key={i} User={user} sno={i} />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
