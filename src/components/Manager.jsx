import { React, useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import uuid from "react-uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [PasswordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showpassword = () => {
    if (ref.current.innerText == "show it") {
      ref.current.innerText = "hide";
      passwordref.current.type = "text";
    } else {
      ref.current.innerText = "show";
      passwordref.current.type = "password";
    }
  };

  const savepassword = () => {
    setPasswordArray([...PasswordArray, { ...form, id: uuid() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...PasswordArray, { ...form, id: uuid() }])
    );
    setform({ site: "", username: "", password: "" });
    return toast("Password Saved", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editpassword = (id) => {
    setform(PasswordArray.filter((item) => item.id === id)[0]);
    setPasswordArray([...PasswordArray].filter((item) => item.id != id));
    7;
  };
  const deletepassword = (id) => {
    let c = confirm("Do you really really wanna delete this password?");
    if (c) {
      setPasswordArray([...PasswordArray].filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify([...PasswordArray].filter((item) => item.id != id))
      );
    }
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    return toast("Copied to clipboard!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>{" "}
      <div className="mx-auto container bg-slate-400 p-10 ">
        <h1 className="text-white text-4xl font-bold text-center">
          Neeraj's passwords
        </h1>
        <p className="text-white text-lg font-bold text-center ">
          Your Own password manager.
        </p>
        <div className="text-white flex flex-col p-4 gap-2 ">
          <input
            onChange={handlechange}
            value={form.site}
            placeholder="Enter Website Url"
            className="rounded-full border border-blue-800 p-4 py-1  text-black "
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-2">
            <input
              onChange={handlechange}
              value={form.username}
              placeholder="Enter username"
              className="rounded-full w-1/2 border border-blue-800 p-4 py-1 text-black "
              type="text"
              name="username"
            />
            <div className="relative w-1/2 text-black  ">
              <input
                ref={passwordref}
                onChange={handlechange}
                value={form.password}
                placeholder="Enter password"
                className="rounded-full w-full border border-blue-800 p-4 py-1 text-black "
                type="password"
                name="password"
              />
              <span
                ref={ref}
                className="absolute right-[10px] top-[0px] bottom-[0px] flex items-center cursor-pointer"
                onClick={showpassword}
              >
                show
              </span>
            </div>
          </div>
          <button
            className="py-2 px-2 bg-blue-400 hover:bg-blue-300 rounded-full flex justify-center align-middle gap-2 "
            onClick={savepassword}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            Save Password
          </button>
        </div>
      </div>
      {PasswordArray.length == 0 && (
        <div className="font-bold text-xl py-4 container mx-auto">
          No password to show.
        </div>
      )}
      {PasswordArray.length != 0 && (
        <div className="your-passwords w-full container mx-auto mt-5">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          <table className="table-auto w-full rounded-sm overflow-hidden ">
            <thead className="bg-purple-400">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-purple-100">
              {PasswordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center py-2 border border-white ">
                      <div
                        className="cursor-pointer flex justify-center align-middle gap-2"
                        onClick={() => {
                          copyText(item.site);
                        }}
                      >
                        {item.site}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white ">
                      <div
                        className="cursor-pointer flex justify-center align-middle gap-2"
                        onClick={() => {
                          copyText(item.username);
                        }}
                      >
                        {item.username}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white  ">
                      <div
                        className="cursor-pointer flex justify-center align-middle gap-2"
                        onClick={() => {
                          copyText(item.password);
                        }}
                      >
                        {item.password}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white  ">
                      <div className="cursor-pointer flex justify-center align-middle gap-2">
                        <svg
                          onClick={() => editpassword(item.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        <svg
                          onClick={() => deletepassword(item.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Manager;
