import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { MdClose, MdToken } from "react-icons/md";
export default function AddTokenModal(_a) {
    var className = _a.className;
    var _b = useAuth(), token = _b.token, addToken = _b.addToken, clearToken = _b.clearToken;
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var _d = React.useState(token), input = _d[0], setInput = _d[1];
    var handleInput = function (e) {
        setInput(e.target.value);
    };
    var handleClear = function () {
        clearToken();
        setOpen(false);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        addToken(input);
        setOpen(false);
    };
    return (<>
      <button className={"hidden rounded bg-green-500 p-4 text-white hover:bg-green-600 md:block ".concat(className)} onClick={function () { return setOpen(true); }}>
        Add your API token
      </button>
      <button className={"flex items-center gap-x-1 rounded bg-green-500 p-4 text-white hover:bg-green-600 md:hidden ".concat(className)} onClick={function () { return setOpen(true); }}>
        <MdToken /> Api Key
      </button>
      {open && (<div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all">
          <div className="relative m-4 max-w-2xl rounded bg-tertiary p-4 shadow-xl">
            <div className="absolute right-0 top-0 m-2">
              <button className="rounded p-2 text-primary hover:bg-primary/50" onClick={function () { return setOpen(false); }}>
                <MdClose />
              </button>
            </div>
            <h1 className="text-2xl font-medium text-primary">
              Your API token
            </h1>
            <p className="mt-4 text-lg text-primary/80">
              You can get your API token from the{" "}
              <a href="https://beta.openai.com/account/api-keys" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                OpenAI dashboard
              </a>
              . All requests are made on the client side, so your token is never
              sent to the server. If you would like more information look at the{" "}
              <a href="https://github.com/Nashex/gpt4-playground" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                Github Repository
              </a>
              !
            </p>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="sk-NhU98cac878..." className="mt-4 w-full rounded border-none bg-secondary p-4 text-primary outline-none" onChange={handleInput} value={input}/>
              <div className="mt-4 flex justify-end">
                <button type="button" className="mr-2 rounded px-4 py-2 text-primary hover:bg-primary/50" onClick={handleClear}>
                  Clear Token
                </button>
                <button type="submit" className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </>);
}
