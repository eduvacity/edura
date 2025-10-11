"use client"
import { CopyIcon } from "@/components/SVGs/portal"
import Editor, { OnChange } from "@monaco-editor/react"
import { IconButton } from "@mui/material"
import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import RunCodeExample from "./preview"

const Playground: React.FC = () => {
  const [code, setCode] = useState<string>(codeSample)

  const handleEditorChange: OnChange = (value) => {
    if (value) setCode(value)
  }
  return (
    <div className="w-full h-full max-w-[882.75px] min-h-[520.88px] rounded-[15px] flex flex-col gap-[22px] relative">
      {/* Header with Copy Icon */}
      <div className="w-full flex justify-end items-end py-8 px-6 z-10">
        <CopyToClipboard
          text={code}
          onCopy={() => toast.success("Code copied to clipboard")}
        >
          <IconButton>
            <CopyIcon />
          </IconButton>
        </CopyToClipboard>
      </div>
      <div className="absolute inset-0 z-1 w-full h-full font-mono  p-4 rounded-lg overflow-auto">
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="typescript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            readOnly: true,
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Footer with Run Button */}
      <div className="absolute bottom-10 right-10 flex justify-end mt-4 z-10">
        <RunCodeExample />
      </div>
    </div>
  )
}

export default Playground

const codeSample = `
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import { 
  Button, 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem 
} from '@nextui-org/react';
import logo from '../assets/logo.svg';

interface MenuItem {
  name: string;
  path: string;
  isDropdown: boolean;
  dropdownItems?: { name: string; path: string }[];
}

interface DemoButtonProps {
  title: string;
  isScroll?: boolean;
  link?: string;
  path?: string;
  isMobile?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
}

const DemoButton: React.FC<DemoButtonProps> = ({
  title, 
  isScroll = false, 
  link, 
  path, 
  isMobile, 
  setIsMenuOpen,
}) => {
  return (
    <>
      {!isScroll && link ? (
        <Button 
          as={Link} 
          href={link} 
          color="success" 
          variant="bordered"
          className="bg-[#111827] rounded-none transition-all duration-300 text-white font-semibold text-sm lg-md:text-xs py-3 lg-md:py-3 px-9 lg-md:px-6"
        >
          {title}
        </Button>
      ) : isScroll && path ? (
        <Button 
          onClick={() => {
            isMobile && setIsMenuOpen && setIsMenuOpen(false);
          }}
          className="bg-[#111827] rounded-none transition-all duration-300 text-white font-semibold text-sm lg-md:text-xs py-3 lg-md:py-3 px-9 lg-md:px-6"
        >
          {title}
        </Button>
      ) : null}
    </>
  );
};

export default DemoButton;
  `
