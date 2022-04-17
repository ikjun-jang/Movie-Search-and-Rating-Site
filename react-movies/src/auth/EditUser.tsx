import { urlAccounts } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { userCredentials, userDTO } from "./auth.models";
import AuthForm from "./AuthForm";

export default function EditUser() {
  return (
    <EditEntity<userCredentials, userDTO>
      url={urlAccounts}
      entityName="User"
      indexURL="/users"
    >
      {(entity, edit) => (
        <AuthForm
          model={entity}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      )}
    </EditEntity>
  );
}
