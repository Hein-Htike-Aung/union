import { Delete, Edit } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { privateApi } from "../../api";

export function ActionButton({ id, user }: { id: number; user: User }) {
  const queryclient = useQueryClient();
  const deleteMutation = useMutation(
    () => privateApi.delete(`/v1/users/${id}`),
    {
      onSuccess: () => {
        queryclient.invalidateQueries("users");
      },
    }
  );
  return (
    <div className="flex items-center">
      <Delete
        onClick={() => deleteMutation.mutate()}
        className="cursor-pointer"
      />
      <Link to={`/dashboard/account/edit/${id}`} state={{ user }}>
        <Edit className="cursor-pointer" />
      </Link>
    </div>
  );
}
