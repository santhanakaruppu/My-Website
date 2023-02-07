import Table from "react-bootstrap/Table";

const UserTable = ({ userData }) => {
  return (
    <div className="table">
      <Table responsive>
        <thead>
          <tr>
            <th>SNO</th>
            <th>UserName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
