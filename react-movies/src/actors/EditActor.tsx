import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import ActorForm from "./ActorForm";
import { actorDTO, actorCreationDTO } from "./actors.model";
import { convertActorToFormData } from "../utils/formDataUtils";

export default function EditActor() {
  function transform(actor: actorDTO): actorCreationDTO {
    return {
      name: actor.name,
      pictureURL: actor.picture,
      biography: actor.biography,
      dateOfBirth: new Date(actor.dateOfBirth),
    };
  }

  return (
    <EditEntity<actorCreationDTO, actorDTO>
      url={urlActors}
      indexURL="/actors"
      entityName="Actor"
      transformFormData={convertActorToFormData}
      transform={transform}
    >
      {(entity, edit) => (
        <ActorForm
          model={entity}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      )}
    </EditEntity>
  );
}
