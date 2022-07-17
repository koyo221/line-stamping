import { useEffect, useState } from "react"
import { Auth } from "../../../interfaces/auth";
import { Linkage, LinkageAccount } from "../../../interfaces/fetchLinkage";
import { fetchLinkage, postKotCodes } from "../../../services/httpService"

export function Table(props: Auth) {
  const [isLoading, setIsLoading] = useState(true);
  const [linkage, setLinkage] = useState<Linkage>();

  const ColumnNames = ["LINE表示名", "従業員番号", "従業員名",];

  useEffect(() => {
    fetchLinkage(props.username, props.accessToken).then((res) => {
      setLinkage(res.data);
      setIsLoading(false);
    })
  }, [props.username, props.accessToken])

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
    try {
      await postKotCodes(body, props.accessToken);
      window.location.reload();
    } catch (e) {
      alert("エラーが発生しました。");
    }

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
      <div className="py-20">
        <svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
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
      <div className="pt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => submit()}>更新する</button>
      </div>
    </div>
  )
}
