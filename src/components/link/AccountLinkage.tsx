import { Auth } from "../../interfaces/auth";
import { Navbar } from "../header/Navbar";
import { Table } from "./table/Table";

export function AccountLinkage(props: Auth) {
  return (
    <div>
      <Navbar></Navbar>
      <Table username={props.username}></Table>
    </div>
  );
}
