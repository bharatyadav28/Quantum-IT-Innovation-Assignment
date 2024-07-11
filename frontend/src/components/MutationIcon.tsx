import { Trash2 as DeleteIcon, Pencil as UpdateIcon } from "lucide-react";
import { Button } from "./ui/button";

interface propTypes {
  isUpdate: boolean;
  handleClick?: () => void;
}
const MutationButton: React.FC<propTypes> = ({
  isUpdate,

  handleClick,
}) => {
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      className="w-4 h-4 p-0 bg-none text-muted-foreground hover:text-foreground  "
    >
      {isUpdate ? <UpdateIcon /> : <DeleteIcon />}
    </Button>
  );
};

export default MutationButton;
