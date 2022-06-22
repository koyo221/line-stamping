import { useEffect, useState } from "react"
import { Auth } from "../../../interfaces/auth";
import { Linkage, LinkageAccount } from "../../../interfaces/fetchLinkage";
import { fetchLinkage, postKotCodes } from "../../../services/httpService"

export function Table(props: Auth) {
  const [isLoading, setIsLoading] = useState(true);
  const [linkage, setLinkage] = useState<Linkage>();

  const ColumnNames = ["LINE表示名", "従業員番号", "従業員名",];

  useEffect(() => {
    fetchLinkage(props.username).then((res) => {
      setLinkage(res.data);
      setIsLoading(false);
    })
  }, [props.username])

  const changeCode = (event: any, user: LinkageAccount) => {
    console.log(event.nativeEvent);
    setLinkage((prevState) => {
      if (!prevState || !prevState.accounts || isLoading) return;
      // Creates new linkage
      const accounts =  prevState.accounts.map((e: LinkageAccount) => {
        return e.line_user_id === user.line_user_id ? {...user, employee_code: event.target.value, edited: true} : e;
      })
      return {...prevState, accounts};
    })
  }

  const submit = async () => {
    const body = createSubmitParam();
    console.log(body);
    const res = await postKotCodes(body);
  }

  const createSubmitParam = () => {
    if (!linkage || !linkage.accounts || isLoading || props.username === undefined) {
      return alert('エラーが発生しました。')
    }
    const param: Linkage = {
      company_id: props.username,
      accounts: linkage.accounts.filter((e) => e.edited)
    }
    return param;
  }

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="p-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* Table Header */}
              {ColumnNames.map(e => {
                return (
                  <th scope="col" className="px-6 py-3" key={e}>
                    {e}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* Table Body */}
            {linkage?.accounts && linkage.accounts.map((e) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e.line_user_id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {e.line_display_name}
                  </th>
                  <td className="px-6 py-4">
                    <div>
                      <input type="text" id={e.line_user_id} onChange={(event) => changeCode(event, e)}
                        className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={e.employee_code}></input>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${e.employee_name ? 'text-green-500' : 'text-red-500'}`}>
                    {e.employee_name || "未連携"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div><button type="button" onClick={() => submit()}>更新する</button></div>
    </div>
  )
}
