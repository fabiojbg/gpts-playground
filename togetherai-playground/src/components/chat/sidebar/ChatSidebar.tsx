import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdAdd, MdDeleteOutline, MdBuild } from "react-icons/md";
import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatModels } from "@/utils/OpenAI";
import Github from "../../misc/Github";
import ThemeButton from "./buttons/ThemeButton";
import ButtonContainer from "./buttons/ButtonContainer";
import Conversations from "./conversation/Conversations";
import ApiKey from "./buttons/ApiKey";
import CurrentModel from './buttons/CurrentModel';

type Props = {};

export default function ChatSidebar({}: Props) {
  const { clearConversations, config } = useOpenAI();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="dark left-0 top-0 h-full max-h-screen flex-col bg-gray-900 text-primary md:fixed md:flex md:w-[332px]">
      <div className="flex h-full flex-col items-stretch p-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded border border-white/20 p-4 transition-colors hover:bg-gray-500/10"
        >
          <MdAdd />
          New chat
        </Link>

        <Conversations />

        <div className="flex flex-col gap-y-2 border-y border-white/10 py-2">
          <div className="flex flex-col border-b border-white/10 gap-y-2">
            <CurrentModel />
            <div className="text-sm text-gray-300 space-y-1 px-4 pb-2">
              <div>Context Length: {mounted ? OpenAIChatModels[config?.model]?.context?.toLocaleString('en-US') : 'N/A'}</div>
              <div>
                Input ($/1M tokens):{" $ "}
                {mounted ? OpenAIChatModels[config?.model]?.inputFee?.toLocaleString('en-US', {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                }) : '0.000'}
              </div>
              <div>
                Output ($/1M tokens):{" $"}
                {mounted ? OpenAIChatModels[config?.model]?.outputFee?.toLocaleString('en-US', {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                }) : '0.000'}
              </div>
            </div>
            <ApiKey />
          </div>
          <Link
            className="flex items-center gap-3 rounded p-3 transition-colors hover:bg-gray-500/10"
            href="/playground"
          >
            <MdBuild />
            Playground
          </Link>
          <ButtonContainer onClick={clearConversations}>
            <MdDeleteOutline />
            Clear Conversations
          </ButtonContainer>

          <ThemeButton />
        </div>

        <Github />
        <span className="text-center text-primary/80 text-sm mt-2">
          Customized by Fabio Botelho
        </span>
      </div>
    </div>
  );
}
