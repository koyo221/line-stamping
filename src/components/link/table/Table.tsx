import { useEffect, useState } from "react"
import { Linkage } from "../../../interfaces/fetchLinkage";
import { fetchLinkage } from "../../../services/httpService"

export function Table() {

  const [isLoading, setIsLoading] = useState(true);
  const [linkage, setLinkage] = useState<Linkage>();

  const ColumnNames = ["LINE表示名", "従業員番号", "従業員名",];

  useEffect(() => {
    fetchLinkage().then((res) => {
      console.log(res.data);
      setLinkage(res.data);
      setIsLoading(false);
    })
  }, [])

  if (isLoading) {
    return (
      <div>Loading. sorry!</div>
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e.kot_key}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {e.line_display_name}
                  </th>
                  <td className="px-6 py-4">
                    <div>
                      <input type="text" id="small-input"
                        className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={e.kot_number}></input>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${e.kot_name ? 'text-green-500' : 'text-red-500'}`}>
                    {e.kot_name || "未連携"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
