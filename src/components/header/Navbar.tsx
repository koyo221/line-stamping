import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { AccountLinkageInterface } from "../../interfaces/auth";
import { fetchCompanyInfo, postCompanyInfo } from "../../services/httpService";

interface Response {
  kotToken: string;
  lineToken: string;
}

export function Navbar(props: AccountLinkageInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<Response>({kotToken: "", lineToken: ""});

  useEffect(() => {
    fetchCompanyInfo(props.username, props.accessToken).then((res) => {
      setCompanyInfo({kotToken: res.data.kot_token, lineToken: res.data.line_token});
    })
  }, [props.username, props.accessToken])

  const submit = async () => {
    const body = {
      "id": props.username,
      "kot_token": companyInfo.kotToken,
      "line_token": companyInfo.lineToken
    }
    console.log(body);
    try {
      await postCompanyInfo(body, props.accessToken);
      window.location.reload()
    } catch (e) {
      alert("エラーが発生しました。")
    }
  }

  const onChangeInput = (event: any, type: "kot" | "line") => {
    console.log(event.nativeEvent);
    switch (type) {
      case "kot":
        setCompanyInfo((prevState) => {
          return {...prevState, kotToken: event.target.value}
        })
        break;
      case "line":
        setCompanyInfo((prevState) => {
          return {...prevState, lineToken: event.target.value}
        })
        break;
    }
  }


  return (
    <div className="border-b border-gray-400">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <p className="text-4xl font-bold text-gray-700">LINE打刻連携</p>
          </a>
          <div className="flex">
            <button
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() =>  {
                setIsOpen(true);
                console.log(companyInfo);
              }}
            >
              アクセストークンを登録する
            </button>
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => props.signOut()}>
              ログアウト
            </button>
            <Modal
              show={isOpen}
              size="md"
              popup={true}
              onClose={() => setIsOpen(false)}
            >
              <Modal.Header>
                <p className="py-4 px-4">アクセストークンを登録する</p>
              </Modal.Header>
              <Modal.Body>
                <form className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                  <div>
                    <div className="mb-2 block pt-2">
                      <Label
                        htmlFor="kot_token"
                        value="King of Timeアクセストークン"
                      />
                    </div>
                    <TextInput
                      id="kot_token"
                      defaultValue={companyInfo.kotToken ?? ""}
                      onChange={(event) => onChangeInput(event, "kot")}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="line_token"
                        value="LINEアクセストークン"
                      />
                    </div>
                    <TextInput
                      id="line_token"
                      defaultValue={companyInfo.lineToken ?? ""}
                      onChange={(event) => onChangeInput(event, "line")}
                    />
                  </div>
                  <div className="w-full">
                    <Button onClick={() => submit()}>
                      登録
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </nav>
    </div>
  )
}
