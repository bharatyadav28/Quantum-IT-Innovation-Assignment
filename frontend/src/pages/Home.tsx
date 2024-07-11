import { usersData } from "../lib/mockData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import MutationButton from "../components/MutationIcon";

const Home = () => {
  return (
    <div className=" flex justify-center bg-[#F7F7F8] h-screen ">
      <div className="w-full max-w-[50rem] mt-[5rem] rounded-md border  shadow-md bg-lightShade h-max">
        <Table>
          <TableCaption>A list of recent users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.doc}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell className="flex gap-1 items-center">
                  <MutationButton isUpdate={true} />{" "}
                  <MutationButton isUpdate={false} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
