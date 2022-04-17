import axios from "axios";
import Swal from "sweetalert2";
import { urlAccounts } from "../endpoints";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.models";

export default function IndexUsers() {
  async function makeAdmin(id: string) {
    await doAdmin(`${urlAccounts}/makeAdmin`, id);
  }

  async function removeAdmin(id: string) {
    await doAdmin(`${urlAccounts}/removeAdmin`, id);
  }

  async function doAdmin(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
    swalFire();
  }

  // function deleteUser(id: string) {
  //   axios.delete(`${urlAccounts}/delete/${id}`);
  //   swalFire();
  // }

  function swalFire() {
    Swal.fire({
      title: "Success",
      text: "Operation finished correctly",
      icon: "success",
    });
  }

  return (
    <IndexEntity<userDTO> title="Users" url={`${urlAccounts}/listUsers`}>
      {(users, buttons) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <Button
                    onClick={() =>
                      customConfirm(
                        () => makeAdmin(user.id),
                        `Do you wish to make ${user.email} an admin?`,
                        `Do it`
                      )
                    }
                  >
                    Make Admin
                  </Button>
                  <Button
                    className="btn btn-danger ms-2"
                    onClick={() =>
                      customConfirm(
                        () => removeAdmin(user.id),
                        `Do you wish to remove ${user.email} as an admin?`,
                        `Do it`
                      )
                    }
                  >
                    Remove Admin
                  </Button>
                  {/* {buttons(`users/edit/${user.id}`)} */}
                  {/* <Button
                    className="btn btn-danger ms-2"
                    onClick={() =>
                      customConfirm(
                        () => deleteUser(user.id),
                        `Do you wish to delete ${user.email}?`,
                        `Do it`
                      )
                    }
                  >
                    Delete
                  </Button> */}
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
