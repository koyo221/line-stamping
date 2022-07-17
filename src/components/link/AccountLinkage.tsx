import { AccountLinkageInterface } from "../../interfaces/auth";
import { Navbar } from "../header/Navbar";
import { Table } from "./table/Table";

export function AccountLinkage(props: AccountLinkageInterface) {
  return (
    <div>
      <Navbar username={props.username} accessToken={props.accessToken} signOut={props.signOut}></Navbar>
      <div className="pt-4 text-sm">※King of Time APIの仕様により、8:30〜10:00、17:30〜18:30の時間帯には従業員情報の更新ができません。</div>
      <Table username={props.username} accessToken={props.accessToken}></Table>
    </div>
  );
}
