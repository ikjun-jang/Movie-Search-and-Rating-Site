import { urlGenres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { genreCreationDTO, genreDTO } from "./genre.model";
import GenreForm from "./GenreForm";

export default function EditGenre() {
  return (
    <EditEntity<genreCreationDTO, genreDTO>
      url={urlGenres}
      entityName="Genres"
      indexURL="/genres"
    >
      {(entity, edit) => (
        <GenreForm
          model={entity}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      )}
    </EditEntity>
  );
}
